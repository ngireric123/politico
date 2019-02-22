
import Joi from 'joi';
import _ from 'underscore';
import jwt from 'jsonwebtoken';
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
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details,
      });
    }
    // const newemail = CreateUser.emailCheck(req.body.email);
    const user = await CreateUser.emailCheck(req.body.email);
    if (user.length !== 0) {
      return res.status(409).send({
        status: 409,
        error: `${user[0].email} has been taken`,
      });
    }

    const addedUser = await CreateUser.addUser(req.body);
    const newUser = _.omit(addedUser, 'password');
    const token = jwt.sign({ newUser }, process.env.PRIVATE_KEY, { expiresIn: 360 });
    return res.status(201).send({
      status: 201,
      data: [{
        token,
        user: newUser[0],
      }],
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
    const user = await CreateUser.emailCheck(req.body.email);
    if (user.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'Wrong authentication',
      });
    }
    const validPassword = await bcrypt.compare(req.body.password, user[0].password);
    if (validPassword) {
      const newUser = _.omit(user, 'password');
      const token = jwt.sign({ newUser }, process.env.PRIVATE_KEY, { expiresIn: 360 });
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user: newUser,
        }],
      });
    }

    return res.status(404).send({
      status: 404,
      error: 'Wrong email or password',
    });
  }
}

export default User;
