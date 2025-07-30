const Joi = require("joi");

exports.createEventSchema = Joi.object({
  title: Joi.string().required(),
  datetime: Joi.date().iso().required(),
  location: Joi.string().required(),
  capacity: Joi.number().integer().min(1).max(1000).required(),
});

exports.createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

exports.registerSchema = Joi.object({
  userId: Joi.number().required(),
});
