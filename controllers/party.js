import parties from '../models/party';
import Joi from 'joi';
class Party {
  //Get all political Parties
  static async getAllParties (req, res){
    const long = parties.length;
    if(long  === 0) return res.status(404).send({
      status: 404,
      error: 'No political party registered'
    });
    res.status(200).send({
      status: 200,
      data:parties
    });
 }

 // create a new political party

	static async create(req, res){

		const schema = {
			name: Joi.string().max(255).min(2).required().trim(),
			hqaddress: Joi.string().max(255).min(2).required().trim(),
			logourl: Joi.string().max(255).min(3).required().trim()
		}

		const {error} = Joi.validate(req.body, schema);

		if(error) return res.status(400).send({
							status: 400,
							error: error.details[0].message
						});

		const newParty = {
			id: parties.length + 1,
			name: req.body.name,
			hqaddress: req.body.hqaddress,
			logourl: req.body.logourl
		}

		parties.push(newParty);

		res.status(201).send({
			status: 201,
			data: newParty
		});
	}





}

export default Party;
