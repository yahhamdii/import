const mongoose = require('mongoose');

// Produit Schema
const produitSchema = mongoose.Schema({
	code_produit:{
		type: String
	},
	code_departement:{
		type: String
	},
	code_secteur:{
		type: String
	},
	code_entreprise:{
		type: String
	},
	code_rayon:{
		type: String
	},
	code_marque:{
		type: String
	},
	code_famille:{
		type: String
	},
	code_sous_famille:{
		type: String
	},
	code_segment: {
       type : String
	},
	denomination_produit_base: {
		type : String
	 },
	 denomination_produit_long: {
		type : String
	 },
	 denomination_produit_court: {
		type : String
	 },
	 denomination_produit_caisse: {
		type : String
	 },
	 poids_variable: {
		type : String
	 },
	 description_produit: {
		type : String
	 },
	 format_produit: {
		type : String
	 },
	 dlc_produit: {
		type : String
	 },
	 dlc_moyenne: {
		type : String
	 },
	 dlc_garantie_produit: {
		type : String
	 },
	 ean13_produit: {
		type : String
	 },
	 ingredients_produits: {
		type : String
	 },
	 rhf_produit: {
		type : String
	 },
	 origine: {
		type : String
	 },
	 temperature: {
		type : String
	 },
	 translation_validation: {
		type : String
	 },
	 ndp: {
		type : String
	 },
	 actif: {
		type : Boolean
	 },
	 marketing_code: {
		type : String
	 },
	 nature_code: {
		type : String
	 },
	 special_suivi: {
		type : String
	 },
	 tva_code: {
		type : String
	 },
	 created_at: {
		type : String
	 },
	 updated_at: {
		type : String
	 },
	 contenance: {
		type : String
	 },
	 pcb: {
		type : String
	 },
	 sale_unity: {
		type : String
	 },
	 sale_command_mesure_unity: {
		type : String
	 },
	 pre_commande: {
		type : Boolean
	 },
	 alcool: {
		type : String
	 },
	 liquide: {
		type : String
	 },
	 started_at: {
		type : String
	 },
	 ended_at: {
		type : String
	 },
	 libelle_marque: {
		type : String
	 },
	 code_entrepot: {
		type : String
	 },
	 le_mans: {
		type : String
	 },
	 q: {
		type : String
	 },
	 pan: {
		type : String
	 },
	 prix_de_cession: {
		type : String
	 },
	 prix_preste: {
		type : String
	 },
	 duree_vie_jours: {
		type : String
	 },
	 contrat_date_logidis: {
		type : String
	 },
	 fin_validite_article: {
		type : String
	 },
	 code_ifls_de_remplacement: {
		type : String
	 },
	 arfbi: {
		type : String
	 },
	 cfe: {
		type : String
	 },
	 rgt: {
		type : String
	 },
	 code_disponibilite: {
		type : String
	 },
	 code_fournisseur: {
		type : String
	 },
	 nom_fournisseur: {
		type : String
	 },
	 departement_fournisseur: {
		type : String
	 },
	 code_dangereux: {
		type : String
	 },
	 is_new: {
		type : String
	 },
	 pieces_art_k: {
		type : String
	 },
	 in_achat_logidis: {
		type : String
	 },
	 is_blacklisted: {
		type : String
	 },
	 deleted_at: {
		type : String
	 }
});

const Produit = module.exports = mongoose.model('Produit', produitSchema);

// Get Produits
module.exports.getProduits = (callback, limit) => {
	Produit.find(callback).limit(limit);
}

// Get Produit
module.exports.getProduitById = (id, callback) => {
	Produit.findById(id, callback);
}

// Add Produit
module.exports.addProduit = (produit, callback) => {
	Produit.create(produit, callback);
}

// Update Produit
module.exports.updateProduit = (id, produit, options, callback) => {
	var query = {_id: id};
	var update = {
		code_produit: produit.code_produit,
		code_departement: produit.code_departement,
		code_secteur: produit.code_secteur,
		code_entreprise: produit.code_entreprise,
		code_rayon: produit.code_rayon,
		code_marque: produit.code_marque,
		code_famille: produit.code_famille,
		code_sous_famille: produit.code_sous_famille,
		denomination_produit_base: produit.denomination_produit_base,
		denomination_produit_long: produit.denomination_produit_long,
		denomination_produit_court: produit.denomination_produit_court,
		denomination_produit_caisse: produit.denomination_produit_caisse,
		poids_variable: produit.poids_variable,
		description_produit: produit.description_produit,
		format_produit: produit.format_produit,
		dlc_produit: produit.dlc_produit,
		dlc_moyenne: produit.dlc_moyenne,
		dlc_garantie_produit: produit.dlc_garantie_produit,
		ean13_produit: produit.ean13_produit,
		ingredients_produits: produit.ingredients_produits,
		rhf_produit: produit.rhf_produit,
		origine: produit.origine,
		temperature: produit.temperature,
		translation_validation: produit.translation_validation,
		ndp: produit.ndp,
		actif: produit.actif,
		marketing_code: produit.marketing_code,
		nature_code: produit.nature_code,
		special_suivi: produit.special_suivi,
		tva_code: produit.tva_code,
		contenance: produit.contenance,
		pcb: produit.pcb,
		sale_unity: produit.sale_unity,
		sale_command_mesure_unity: produit.sale_command_mesure_unity,
		alcool: produit.alcool,
		liquide: produit.liquide,
		started_at: produit.started_at,
		ended_at: produit.ended_at,
		libelle_marque: produit.libelle_marque,
		code_entrepot: produit.code_entrepot,
		le_mans: produit.le_mans,
		q: produit.q,
		pan: produit.pan,
		prix_de_cession: produit.prix_de_cession,
		prix_preste: produit.prix_preste,
		duree_vie_jours: produit.duree_vie_jours,
		contrat_date_logidis: produit.contrat_date_logidis,
		fin_validite_article: produit.fin_validite_article,
		code_ifls_de_remplacement: produit.code_ifls_de_remplacement,
		arfbi: produit.arfbi,
		cfe: produit.cfe,
		rgt: produit.rgt,
		code_disponibilite: produit.code_disponibilite,
		code_fournisseur: produit.code_fournisseur,
		nom_fournisseur: produit.nom_fournisseur,
		departement_fournisseur: produit.departement_fournisseur,
		code_dangereux: produit.code_dangereux,
		is_new: produit.is_new,
		pieces_art_k: produit.pieces_art_k,
		in_achat_logidis: produit.in_achat_logidis,
		is_blacklisted: produit.is_blacklisted,
	}
	Produit.updateOne(query, update, options, callback);
}

// Delete Produit
module.exports.removeProduit = (id, callback) => {
	var query = {_id: id};
	Produit.remove(query, callback);
}
