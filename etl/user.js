const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017'; 
const dbName = 'commandecom';
import csv from 'csvtojson';
import { map } from 'lodash';
const csvFilePath='${__dirname}/../data/user.csv'
const client = new MongoClient(url,{ useNewUrlParser: true });

csv({noheader:true, 
    headers:["id_utilisateur","code_zone_sec","code_zone_frais","code_zone_surgele","meta",
             "code_entreprise","username","email","password","enabled",
             "salt","roles","last_login","confirmation_token","password_requested_at",
             "prenom_utilisateur","nom_utilisateur","pays_vente","ca_utilisateur","nature_utilisateur",
             "poste_utilisateur","numero1_utilisateur","numero2_utilisateur","fax_utilisateur","etat",
             "statut_utilisateur","importation_france","locale_utilisateur","commentaire_utilisateur","gamme_utilisateur",
             "produit_demande_utilisateur","created","updated","cgv_cpv","cgv_cpv_signed_at",
             "cgv_cpv_updated_at","already_signed","flag_franco","montant_franco","entreprise_courante",
             "pre_commande","date_debut_validite","date_fin_validite","premiere_visite"],  
    output: "json"}).fromFile(csvFilePath).then(async (jsonObj)=>{
  
    const ids = map(jsonObj, item => item.id_utilisateur);
    var myquery = { code_famille: { $in: ids } };
    client.connect(async function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const v = await  a(db, myquery);
        const vv = await  b(db,jsonObj,v);
      return vv;
       
    });
});
async function a(db,myquery){

    db.collection("users").deleteMany(myquery, function(err, r) {
        assert.equal(null, err);
        client.close();
      });
}
async function b(db,jsonObj){
    db.collection('users').insertMany(jsonObj, function(err, r) {
        assert.equal(null, err);
        client.close();
     });
}
