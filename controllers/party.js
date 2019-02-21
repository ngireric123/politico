/* eslint-disable camelcase */
import Joi from 'joi';
import Parties from '../models/party';

class Party {
  static async createParty(req, res) {
    const schema = {
      name: Joi.string().regex(/$^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).required(),
      hqAddress: Joi.string().max(255).min(2).required()
        .trim(),
      logoUrl: Joi.string().max(255).min(3).required()
        .trim(),
    };
    const { error } = Joi.validate(req.body, schema);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const party1 = await Parties.checkp(req.body.name);
    if (!party1) {
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

  // get party
  static async getParty(req, res) {
    const result = await Parties.getOneParty(req.params.id);
    if (result.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'political party you are looking for is not registered',
      });
    }
    return res.status(200).send({
      status: 200,
      data: result,
    });
  }

  static async delete(req, res) {
    const result = await Parties.getAll(req.params.id);

    if (result.length !== 0) {
      await Parties.deleteParty(req.params.id);
      return res.status(200).send({
        status: 200,
        message: 'Political party has been removed completelly',
      });
    }
    return res.status(404).send({
      status: 404,
      error: ' not political party found',
    });
  }
}
export default Party;
