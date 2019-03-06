import mongoose from 'mongoose';

// Famille Schema
const familleSchema = mongoose.Schema({
    code_famille:{
        type: String,
        required: true
    },
    code_rayon: { 
        type: String
      },
    libelle:{
        type:String
    },
    libelle_famille_en:{
       type: String

    },
    created_at:{
        type : String,
        required: false

    }
});

const Famille =  mongoose.model('Famille', familleSchema);


// function validateFamille(famille) {
//     const schema = {
//       code_famille: Joi.string().required(),
//       code_rayon: Joi.string(),
//       libelle: Joi.string().required(),
//       libelle_famille_en: Joi.string().allow(null),
//       created_at : Joi.date().allow(null),
//       code_familleAndlibelle : Joi.array.unique()
     
//     };
  
//     return Joi.validate(famille, schema);
//   }
module.exports = {Famille};