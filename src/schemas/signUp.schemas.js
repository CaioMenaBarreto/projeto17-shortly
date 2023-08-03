import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(5).required(),
    confirmPassword: Joi.string().trim().min(5).required()
});

export default signUpSchema;