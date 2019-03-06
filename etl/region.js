import csv from 'csvtojson';
import mongoose from 'mongoose';
import { map } from 'lodash';
import Region from '../models/region';

mongoose.Promise = global.Promise;

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const dbName = 'commandecom';

const csvFilePath = '${__dirname}/../data/region.csv'

const csv_headers = ["code_region", "nom", "created_at"];
    
mongoose.connect(`${MONGO_URI}/${dbName}`,{ useNewUrlParser: true })
.then(() => {
    console.log('parse begin');
    return parseRegions(csvFilePath, csv_headers)
}) 
.then((regions) => {
    console.log('parsed', regions.length, regions[0]);
    console.log('save begin');
    return saveRegions(regions)
})
.then((regions) => console.log(regions))
.catch((error) => console.log(error));

function parseRegions(file, headers) {
    return csv({
        noheader: true,
        headers: headers,
        output: "json"
    })
    .fromFile(file)
}

async function saveRegions(regionsInput) {
    try {
        const ids = map(regionsInput, region => region.code_region);
        await Region.deleteMany({ code_region: { $in: ids } });
        const regions = await Region.insertMany(regionsInput)
        return regions;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to insert regions'+ error.toString())
    }
    
}
