import mongoose from 'mongoose';
import joi from 'joi';

// Famille Schema
const regionSchema = mongoose.Schema({
    code_region:{
        type: String,
        required: true,
        unique: true
    },
    nom:{
        type: String
    },
    created_at:{
        type:Date
    }
});

const Region =  mongoose.model('Region', regionSchema);

// function validateRegion(rayon) {
//     const schema = {
     
//       code_region: Joi.string(),
//       code_secteur: Joi.string(),
//       libelle: Joi.string(),
//       valeur: Joi.Number(),
//       created_at: joi.date(),
//       _creator: Joi.ObjectId().required()
//     };
  
//     return Joi.validate(rayon, schema);
//   }
module.exports = {Region,regionSchema};