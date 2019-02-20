import Joi from 'joi';

const JoiPhone = Joi.extend(require('joi-phone-number'));

const validateUser = (data) => {
  const schema = {
    firstName: Joi.string().min(5).required().trim(),
    lastName: Joi.string().min(5).required().trim(),
    otherName: Joi.string().min(5).trim(),
    email: Joi.string().email().required().trim(),
    phoneNumber: JoiPhone.string().phoneNumber().min(10).required()
      .trim(),
    password: Joi.string().min(4).required().trim(),
    passportUrl: Joi.string().min(5).required().trim(),
  };

  const { error } = Joi.validate(data, schema);
  return error;
};

export default validateUser;
