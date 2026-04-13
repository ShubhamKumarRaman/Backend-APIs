const Joi = require('joi')

exports.bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
    genre: Joi.string(),
    description: Joi.string(),
    image: Joi.string()
})