import mongoose from 'mongoose';
import crypto from 'crypto';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
// User Schema
const userSchema = mongoose.Schema({
	id_utilisateur:{
		type: String
	},
	code_zone_sec:{
		type: String
	},
	code_zone_frais:{
		type: String
	},
	code_zone_surgele:{
		type: String
	},
	meta:{
		type: String
	},
	code_entreprise:{
		type: String
	},
	username:{
		type: String
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
		  validator: validator.isEmail,
		  message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	enabled: {
       type : String
	},
	salt: {
		type : String
	 },
	 roles: {
		type : String
	 },
	 last_login: {
		type : String
	 },
	 password_rewuest_at: {
		type : String
	 },
	 prenom_utilisateur: {
		type : String
	 },
	 nom_utilisateur: {
		type : String
	 },
	 pays_vente: {
		type : String
	 },
	 ca_utilisateur: {
		type : String
	 },
	 nature_utilisateur: {
		type : String
	 },
	 poste_utilisateur: {
		type : String
	 },
	 numero1_utilisateur: {
		type : String
	 },
	 numero2_utilisateur: {
		type : String
	 },
	 fax_utilisateur: {
		type : String
	 },
	 etat: {
		type : String
	 },
	 statut_utilisateur: {
		type : String
	 },
	 importation_france: {
		type : String
	 },
	 locale_utilisateur: {
		type : String
	 },
	 commentaire_utilisateur: {
		type : String
	 },
	 gamme_utilisateur: {
		type : String
	 },
	 produit_demande_utilisateur:{
        type : String
	 },
	 created: {
		type : String
	 },
	 updated: {
		type : String
	 },
	 cgv_cpv: {
		type : String
	 },
	 cgv_cpv_signed_at: {
		type : String
	 },
	 cgv_cpv_updated_at: {
		type : String
	 },
	 already_signed: {
		type : String
	 },
	 flag_franco: {
		type : String
	 },
	 montant_franco: {
		type : String
	 },
	 entreprise_courante: {
		type : String
	 },
	 pre_commande: {
		type : String
	 },
	 date_debut_validite: {
		type : String
	 },
	 date_fin_validite: {
		type : String
	 },
	 premiere_visite: {
		type : String
	 },
	 confirmation_token: [{
	   access: {
		 type: String,
		 required: true
	   },
	   token: {
		 type: String,
		 required: true
	   }
	 }]
});
userSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};
userSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      confirmation_token: {token}
    }
  });
};
userSchema.pre('save', function (next) {
	
	var user = this;
	if (user.isModified('password')) {
		
	  bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
		  user.password = hash;
		  next();
		});
	  });
	} else {
	  next();
	}
  });
userSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
  
	return _.pick(userObject, ['_id', 'email']);
  };
  userSchema.statics.findByToken  = function (token) {
	var User = this;
	var decoded;
  
	try {
	  decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
	  return Promise.reject();
	}
  
	return User.findOne({
	  '_id': decoded._id,
	  'confirmation_token.token': token,
	  'confirmation_token.access': 'auth'
	});
  };
userSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  
	user.confirmation_token.push({access, token});
  
	return user.save().then(() => {
	  return token;
	});
  };
var User = module.exports = mongoose.model('User', userSchema);
// Get Users
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}


// Get User
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

// Update User
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
		id_utilisateur:user.id_utilisateur,
		code_zone_sec:user.code_zone_sec,
		code_zone_frais:user.code_zone_frais,
		code_zone_surgele:user.code_zone_surgele,
		meta:user.meta,
		code_entreprise:user.code_entreprise,
		username:user.username,
		email:user.email,
		password:user.password,
		enabled: user.enabled,
		salt: user.salt,
		 roles: user.roles,
		 last_login: user.last_login,
		 confirmation_token:user.confirmation_token ,
		 password_rewuest_at:user.password_rewuest_at ,
		 prenom_utilisateur:user.prenom_utilisateur ,
		 nom_utilisateur: user.nom_utilisateur,
		 pays_vente: user.pays_vente,
		 ca_utilisateur: user.ca_utilisateur,
		 nature_utilisateur: user.nature_utilisateur,
		 poste_utilisateur: user.poste_utilisateur,
		 numero1_utilisateur:user.numero1_utilisateur ,
		 numero2_utilisateur: user.numero2_utilisateur,
		 fax_utilisateur: user.fax_utilisateur,
		 etat: user.etat,
		 statut_utilisateur: user.statut_utilisateur,
		 importation_france:user.importation_france ,
		 locale_utilisateur: user.locale_utilisateur,
		 commentaire_utilisateur: user.commentaire_utilisateur,
		 gamme_utilisateur: user.gamme_utilisateur,
		 produit_demande_utilisateur: user.produit_demande_utilisateur,
		 created: user.created,
		 updated: user.updated,
		 cgv_cpv: user.cgv_cpv,
		 cgv_cpv_signed_at: user.cgv_cpv_signed_at,
		 cgv_cpv_updated_at: user.cgv_cpv_updated_at,
		 already_signed: user.already_signed,
		 flag_franco: user.flag_franco,
		 montant_franco: user.montant_franco,
		 entreprise_courante:user.entreprise_courante ,
		 pre_commande: user.pre_commande,
		 date_debut_validite: user.date_debut_validite,
		 date_fin_validite: user.date_fin_validite,
		 premiere_visite: user.premiere_visite
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}

var encodePassword = function (raw, salt) {
    var salted = raw + '{'+salt+'}',
        hash = crypto.createHash('sha512').update(salted, 'utf-8');

    for (var i = 1; i < 5000 ; i++) {
        hash = crypto.createHash('sha512').update(hash.digest('binary')+salted);
    }

    return hash.digest('base64');
};


userSchema.statics.auth= function (email, password, callback) {

	User.findOne({ email: email })
	  .exec(function (err, user) {
		if (err) {
		  return callback(err)
		} else if (!user) {
		  var err = new Error('User not found.');
		  err.status = 401;
		  return callback(err);
		}
		salt  = user.salt;
		var passwordData = encodePassword(password, user.salt);
		if(user.password === passwordData){
			console.log("utilisateur connecé")
		}else{
			console.log("erreur mot de passe")
		}
		
	  });
}

module.exports = {User}
