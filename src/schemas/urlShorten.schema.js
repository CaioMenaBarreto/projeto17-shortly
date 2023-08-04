import Joi from "joi";

const urlShorten = Joi.object({
    url: Joi.string().trim().uri({ scheme: ['http', 'https'] }).required()
});

export default urlShorten;