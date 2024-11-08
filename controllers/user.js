import { postUserValidator, updateUserValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TeacherDashboardModel } from "../models/teacher-dashboard.js"; 
import { mailtransporter } from "../utils/mail.js";

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
        await UserModel.create({
            ...value,
            password: hashedPassword
        });

        await mailtransporter.sendMail({
            to: value.email,
            subject: 'USER REGISTRATION',
            text: 'Account registered successfully!'
        });

        res.json('User registered successfully!');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { error, value } = postUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist');
        }
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!');
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        res.json({
            message: 'User logged in',
            accessToken: token
        });
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
        const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
        const dashboards = await TeacherDashboardModel
            .find({
                ...JSON.parse(filter),
                user: req.auth.id
            })
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        res.status(200).json(dashboards);
    } catch (error) {
        next(error);
    }
};
