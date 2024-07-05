// homework-04/services/validation.js

const Joi = require("joi");

const emailValidation = Joi.string().email().min(6).max(64).required();
const passwordValidation = Joi.string()
  .min(8)
  .max(128)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  .required();

const signupSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

const loginSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

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
  signupSchema,
  loginSchema,
  contactSchema,
  contactUpdateSchema,
  favoriteSchema,
};
