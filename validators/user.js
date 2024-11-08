import Joi from "joi";

export const postUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    role: Joi.string().valid('user', 'vendor')
})

export const updateUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
});
