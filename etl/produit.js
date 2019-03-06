import csv from 'csvtojson';
import mongoose from 'mongoose';
import { map } from 'lodash';
import Product from '../models/produit';

mongoose.Promise = global.Promise;

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const dbName = 'commandecom';

const csvFilePath = '${__dirname}/../data/produit.csv'

const csv_headers = ["code_produit", "code_departement", "code_secteur", "code_entreprise", "code_rayon",
    "code_marque", "code_famille", "code_sous_famille", "code_segment", "denomination_produit_base",
    "denomination_produit_long", "denomination_produit_court", "denomination_produit_caisse", "poids_variable", "description_produit",
    "format_produit", "dlc_produit", "dlc_moyenne", "dlc_garantie_produit", "ean13_produit",
    "ingredients_produits", "rhf_produit", "origine", "temperature", "translation_validation",
    "ndp", "actif", "marketing_code", "nature_code", "special_suivi",
    "tva_code", "created_at", "updated_at", "contenance", "pcb",
    "sale_unity", "sale_command_mesure_unity", "pre_commande", "alcool", "liquide",
    "started_at", "ended_at", "libelle_marque", "code_entrepot", "le_mans",
    "q", "pan", "prix_de_cession", "prix_preste", "duree_vie_jours",
    "contrat_date_logidis", "fin_validite_article", "code_ifls_de_remplacement", "arfbi", "cfe",
    "rgt", "code_disponibilite", "code_fournisseur", "departement_fournisseur", "nom_fournisseur",
    "code_dangereux", "is_new", "pieces_art_k", "in_achat_logidis", "is_blacklisted", "deleted_at"];
    
mongoose.connect(`${MONGO_URI}/${dbName}`,{ useNewUrlParser: true })
.then(() => {
    console.log('parse begin');
    return parseProducts(csvFilePath, csv_headers)
}) 
.then((products) => {
    console.log('parsed', products.length, products[0]);
    console.log('save begin');
    return saveProducts(products)
})
.then((products) => console.log(products))
.catch((error) => console.log(error));

function parseProducts(file, headers) {
    return csv({
        noheader: true,
        headers: headers,
        output: "json"
    })
    .fromFile(file)
}

async function saveProducts(productsInput) {
    try {
        const ids = map(productsInput, product => product.code_produit);
        await Product.deleteMany({ code_produit: { $in: ids } });
        const products = await Product.insertMany(productsInput)
        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to insert products'+ error.toString())
    }
    
}
