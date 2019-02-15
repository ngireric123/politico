import Joi from 'joi';
import parties from '../models/party';

class Party {
  //Get all political Parties
  static async getAllParties (req, res){
    res.status(200).send({
      status: 200,
      data:parties
    });
 }
 // create a new political party
 	static async create(req, res){
 		const schema = {
      name:Joi.string().regex(/$^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(2).required(),
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
    const pname = await parties.find(n => n.name === req.body.name);
    if ( pname ) {
      return res.status(400).json({
        status: 400,
        error:"The political party you are trying to insert is already exist"
      });
    }
 		parties.push(newParty);

 		res.status(201).send({
 			status: 201,
      message:"Political Party Created",
 			data: newParty
 		});
 	}

  // Fetch a specific political party record

  	static async fetchOne(req, res){
  		const party_id = parseInt(req.params.id);
  		const result = [];
  		for(let i = 0; i < parties.length; i ++){
  			if(parties[i].id == party_id){
  				result.push(parties[i]);
  			}
  		}
  	if(result.length == 0) return res.status(404).send({
  										status: 404,
  										error: "political party not found"
  									});
  	res.status(200).send({
  		status: 200,
  		data: result
  	})
  	}

    // Update a specific political party

  	static async update(req, res){
  		const party_id = parseInt(req.params.id);
  		let job = "";
  		for(let i = 0; i < parties.length; i ++){
  			if(parties[i].id == party_id){
  				const schema = {
  					name: Joi.string().min(2).trim(),
  					hqaddress: Joi.string().min(3).trim(),
  					logourl: Joi.string().min(3).trim()
  				}
  				const {error} = Joi.validate(req.body, schema);
  				if(error) return res.status(400).send({
  									status: 400,
  									error: error.details[0].message
  								});
  				if(req.body.name) parties[i].name = req.body.name;
  				if(req.body.hqaddress) parties[i].hqaddress = req.body.hqaddress;
  				if(req.body.logourl) parties[i].logourl = req.body.logourl;
  				res.status(200).send({
  					status: 200,
  					data: parties[i]
  				});
  				job = "done";
  			}
  		}
      
  		if ( job != "done" ){
  			  res.status(404).send({
  					status: 404,
  					error: "political party not found"
  				});
  		}
  	}

    // delete a particular political party

    	static async delete(req, res){
    		const party_id = parseInt(req.params.id);
    		let job = "";
    		for(let i = 0; i < parties.length; i ++){
    			if(parties[i].id == party_id){

    				parties.splice(i, 1);
    				res.status(200).send({
    					status: 200,
    					message: "Political party deleted"
    				});
    				job = "done";
    			}

    		}

    		if ( job != "done" ){
    			  res.status(404).send({
    					status: 404,
    					error: "political party not found"
    				});
    		}
    	}



}

export default Party;
