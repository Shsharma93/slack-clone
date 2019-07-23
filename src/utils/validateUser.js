const Joi = require('@hapi/joi');

const validateUser = user => {
  const schema = {
    username: Joi.string()
      .min(4)
      .max(20)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
  };
  return Joi.validate(user, schema);
};

export default validateUser;
