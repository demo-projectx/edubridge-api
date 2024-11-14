import Joi from "joi";

export const postUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    role: Joi.string().valid('user', 'vendor')
})

export const updateUserValidator = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string(),
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(), // Optional field for password login
    pin: Joi.string().length(4).optional() // Optional field for PIN login, with 4-digit length constraint
}).xor('password', 'pin'); // Ensures only one of password or pin is provided
