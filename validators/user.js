import Joi from "joi";

export const postUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    phone: Joi.string()
    .length(10) // Ensures exactly 10 characters
    .pattern(/^[0-9]+$/) // Ensures only digits
    .required(),
    role: Joi.string().valid('Teacher', 'Parent', 'Student')
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
