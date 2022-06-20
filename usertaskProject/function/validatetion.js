
const Joi = require("joi");


exports.registervalidation = (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
        .required(),
      password: Joi.string().min(6).required(),
    });
    return ({ value, error } = schema.validate(data));
   
  };