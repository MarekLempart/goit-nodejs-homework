// homework-03/services/validation.js

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(2).max(20),
  favorite: Joi.boolean(),
}).or("email", "phone");

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(2).max(20),
  favorite: Joi.boolean(),
}).or("name", "email", "phone", "favorite");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactSchema,
  contactUpdateSchema,
  favoriteSchema,
};
