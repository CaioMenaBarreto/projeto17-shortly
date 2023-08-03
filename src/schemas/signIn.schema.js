import Joi from "joi";

const signInSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(5).required()
});

export default signInSchema;