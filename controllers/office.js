import Joi from 'joi';
import postOffice from '../models/office';

class Office {
  // create a political office
  static async create(req, res) {
    const schema = {
      type: Joi.string().min(5)
        .valid(['federal', 'legislative', 'state', 'local government'])
        .required()
        .trim(),
      name: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const office = await postOffice.officeCheck(req.body.name);
    if (!office) {
      return res.status(409).send({
        status: 409,
        error: 'office you are entering is exist',
      });
    }

    const newOffice = await postOffice.postOffice(req.body);
    return res.status(201).send({
      status: 201,
      data: newOffice,
    });
  }
  // get all political offices

  static async getAll(req, res) {
    const count = await postOffice.getOffices();
    res.status(200).send({
      status: 200,
      data: count,
    });
  }

  // get specific political office

  static async getOne(req, res) {
    const office_id = parseInt(req.params.id);
    const result = [];
    for (let i = 0; i < offices.length; i++) {
      if (offices[i].id == office_id) {
        result.push(offices[i]);
      }
    }
    res.status(200).send({
      status: 200,
      error: 'Political Office not Found',
    });
  }
}
export default Office;
