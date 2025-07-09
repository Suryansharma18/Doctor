const Joi = require('joi');
const { HttpError } = require('../utils/helpers');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('doctor', 'nurse', 'frontdesk').required(),
  contactNumber: Joi.string().required()
});

exports.validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(new HttpError(400, error.details[0].message));
  }
  next();
};