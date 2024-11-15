import { postUserValidator, updateUserValidator, loginUserValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailtransporter } from "../utils/mail.js";

// Function to generate a 4-digit random PIN
function generatePin(length = 4) {
    let pin = '';
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
    }
    return pin;
}

export const registerUser = async (req, res, next) => {
    try {
        const { error, value } = postUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists');
        }
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        const newUser = await UserModel.create({
            ...value,
            password: hashedPassword
        });

        // Generate a unique PIN and check it doesn't already exist
        let pin;
        let pinExists;
        do {
            pin = generatePin();
            pinExists = await UserModel.exists({ pin });
        } while (pinExists);

        // Save the generated PIN to the user's document
        newUser.pin = pin;
        await newUser.save();

        // Send confirmation email with the generated PIN
        await mailtransporter.sendMail({
            to: value.email,
            subject: 'USER REGISTRATION',
            text: `Account registered successfully! Your login PIN is: ${pin}`
        });

        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        const response = {
            user:newUser,
            token
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// loginUser, getProfile, updateProfile, and userLogout remain unchanged

export const loginUser = async (req, res, next) => {
    try {
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        // Find user by email
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist');
        }

        // Check if user provided PIN or password for login
        const isPinLogin = value.pin && !value.password;
        const isPasswordLogin = value.password && !value.pin;

        let isAuthenticated = false;

        if (isPinLogin) {
            // Check if the provided PIN matches the stored PIN
            isAuthenticated = value.pin === user.pin;
        } else if (isPasswordLogin) {
            // Check if the provided password matches the stored password
            isAuthenticated = bcrypt.compareSync(value.password, user.password);
        } else {
            // If both or neither fields are provided, return an error
            return res.status(400).json('Please provide either a password or a PIN');
        }

        if (!isAuthenticated) {
            return res.status(401).json('Invalid credentials!');
        }

        // Generate a token upon successful authentication
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        const response = {
            user,
            token
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


export const getProfile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.auth.id).select({ password: false });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { error, value } = updateUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }
        const updateUser = await UserModel.findByIdAndUpdate(
            req.auth.id,
            value,
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json('User profile updated!');
    } catch (error) {
        next(error);
    }
};

export const userLogout = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            // Optional: Add any additional logout steps here, if needed
            const userId = decoded.id;

            // Send a success response for logout
            res.status(200).json({
                message: 'Logout successful',
                userId,
            });
        });
    } catch (error) {
        console.error('Logout error:', error);
        next(error); // Pass error to the next middleware
    }
};

