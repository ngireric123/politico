import Joi from 'joi';
import offices from '../models/office';

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
    error: error.details[0].message
    })
    };
		const newOffice = {
			id: offices.length + 1,
			type: req.body.type,
			name: req.body.name
		}
		const offine_name = await offices.find(n => n.name === req.body.name);
		if ( offine_name ) {
      return res.status(400).json({
        status: 400,
        error:"The political office you are trying to insert is already exist"
      });
    }
		offices.push(newOffice);

		return res.status(201).send({
			status: 201,
			message: "Political Office created",
			data: newOffice
		});
	}

  //get all political offices

	static async getAll(req, res){
		const count = offices.length;
		res.status(200).send({
			status: 200,
			data: offices
		});
	}

  	// get specific political office

  	static async getOne(req, res){
  		const office_id = parseInt(req.params.id);
  		const result = [];
  		for(let i = 0; i < offices.length; i ++){
  			if(offices[i].id == office_id){
  				result.push(offices[i]);
  			}
  		}
  	res.status(200).send({
  			status: 200,
  			data: result
  		})
  	}
}
export default Office;
