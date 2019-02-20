
import Joi from 'joi';
import _ from 'underscore';
import jwt from 'jsonwebtoken';
import Pool from '../models/db';
import query from '../models/queries';
import Authentication from '../helpers/authentication';
import CreateUser from '../models/user';

const JoiPhone = Joi.extend(require('joi-phone-number'));

class User {
  static async create(req, res) {
    const schema = {
      firstName: Joi.string().min(3).required().trim(),
      lastName: Joi.string().min(3).required().trim(),
      otherName: Joi.string().min(5),
      email: Joi.string().email().required().trim(),
      phoneNumber: JoiPhone.string().phoneNumber().min(10).required()
        .trim(),
      password: Joi.string().min(3).required().trim(),
      passportUrl: Joi.string().min(5).required().trim(),
    };
    const { error } = Joi.validate(req.body, schema, { abortEarly: false });
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details,
      });
    }
    const newemail = CreateUser.check(req.body.email);
    if (!newemail) {
      CreateUser.addUser(req.body);
      const newUser = _.omit(req.body, 'password');
      const token = jwt.sign({ newUser }, process.env.PRIVATE_KEY, { expiresIn: 360 });
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user: newUser,
        }],
      });
    }
    return res.status(409).send({
      status: 409,
      message: 'this e-mail is already in Database',
    });
  }

  static async login(req, res) {
    const schema = {
      email: Joi.string().email().required().trim(),
      password: Joi.string().min(3).required().trim(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const { email, password } = req.body;
    const text = query.login;
    const data = [email];

    const response = await Pool.query(text, data)
      .then(resp => resp)
      .catch((err) => {
        console.log(err);
      });
    const checkPassword = Authentication.comparePassword(response.rows[0].password, password);
    if (checkPassword) {
      const payload = {
        id: res.id,
        email: res.email,
      };
      delete payload.password;
      const token = Authentication.generateToken(payload);
      return res.status(200).send({
        status: 200,
        token,
        user: response.rows[0],
      });
    }
  }
}

export default User;
