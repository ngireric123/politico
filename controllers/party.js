/* eslint-disable camelcase */
import Joi from 'joi';
import Parties from '../models/party';

class Party {
  static async createParty(req, res) {
    const schema = {
      name: Joi.string().regex(/$^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).required(),
      hqaddress: Joi.string().max(255).min(2).required()
        .trim(),
      logourl: Joi.string().max(255).min(3).required()
        .trim(),
    };
    const { error } = Joi.validate(req.body, schema);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
    const party = await Parties.check(req.body.name);
    if (party.length !== 0) {
      return res.status(409).send({
        status: 409,
        error: 'party you are entering is already exist',
      });
    }
    const newParty = await Parties.createParty(req.body);
    return res.status(201).send({
      status: 201,
      data: newParty,
    });
  }

  // get parties
  static async getParties(req, res) {
    const parties = await Parties.getAll();
    res.status(200).send({
      status: 200,
      data: parties,
    });
  }
}
export default Party;
