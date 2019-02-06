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





}

export default Party;
