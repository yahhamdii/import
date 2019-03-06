import mongoose from 'mongoose';
import joi from 'joi';

// Famille Schema
const rayonSchema = mongoose.Schema({
    code_rayon:{
        type: String,
        required: true,
        unique: true
    },
    code_region:{
        type: String
    },
    code_secteur:{
        type:String
    },
    libelle:{
       type: String
    },
    valeur:{
        type: Number
     },
    created_at:{
        type : Date
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
});

const Rayon =  mongoose.model('Rayon', rayonSchema);

function validateRayon(rayon) {
    const schema = {
      code_rayon: Joi.string().disallow(Joi.ref('fieldOne')).required(),
      code_region: Joi.string(),
      code_secteur: Joi.string(),
      libelle: Joi.string(),
      valeur: Joi.Number(),
      created_at: joi.date(),
      _creator: Joi.ObjectId().required()
    };
  
    return Joi.validate(rayon, schema);
  }
module.exports = {Rayon,rayonSchema,validateRayon};