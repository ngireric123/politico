import Joi from 'joi';
import Offices from '../models/office';

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

    const office = await Offices.officeCheck(req.body.name);
    if (!office) {
      return res.status(409).send({
        status: 409,
        error: 'office you are entering is exist',
      });
    }

    const newOffice = await Offices.postOffice(req.body);
    return res.status(201).send({
      status: 201,
      data: newOffice,
    });
  }
  // get offices

  static async getAll(req, res) {
    const count = await Offices.getOffices();
    res.status(200).send({
      status: 200,
      data: count,
    });
  }

  // get office

  static async getOne(req, res) {
    const result = await Offices.getOneOffice(req.params.id);

    if (result.rows.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'not political office found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }
}
export default Office;
