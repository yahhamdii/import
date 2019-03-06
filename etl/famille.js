import csv from 'csvtojson';
import mongoose from 'mongoose';
import { map } from 'lodash';
import { Famille } from '../models/famille';
mongoose.Promise = global.Promise;
const MONGO_URI = 'mongodb://127.0.0.1:27017';
const dbName = 'commandecom';
const csvFileregion1 = '${__dirname}/../data/region1/PMFAMIP.csv';
const csvFileregion2 = '${__dirname}/../data/region2/PMFAMIP.csv';
const csvFileregion3 = '${__dirname}/../data/region3/FAMILLE.csv';
const csvFileregion4 = '${__dirname}/../data/region4/PMFAMIP.csv';

const csv_headers = ["","code_famille","libelle","libelle_famille_en","created_at","code_rayon"];
mongoose.connect(`${MONGO_URI}/${dbName}`, { useNewUrlParser: true })
    .then(() => {
        console.log('parse begin');
        return parseFamilles(csvFileregion1,csv_headers)
    })
    .then((familles) => {
   
        console.log('parsed');
        console.log('save begin');
        let i; 
        for(i = 0; i<familles.length; i++){
        const code_famille = '1-'+familles[i].code_famille;
        const libelle =  familles[i].libelle;
        const libelle_famille_en = familles[i].libelle_famille_en;
        const created_at =familles[i].created_at;
        const code_rayon ='1-'+familles[i].code_rayon;
        const item = {code_famille, libelle, libelle_famille_en, created_at, code_rayon};
         saveFamilles(item);
    }

    
    })
    .then((item) => console.log(item))
    .catch((error) => console.log(error));

function parseFamilles(file,hearders) {
    return csv({
        noheader: true,
        output: "json", 
        headers: hearders,
        trim: true
    })
        .fromFile((file))
}
async function saveFamilles(famillesInput) {
    try {
        console.log(famillesInput[1]);
        const ids = map(famillesInput, famille => '1-'+famille.code_famille);
       
        await Famille.deleteMany({ code_famille: { $in: ids } });
        
        const familles = await Famille.insertMany(famillesInput)
        return familles;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to insert familles' + error.toString())
    }

}
