import * as crypto from "crypto";
import { v4 } from 'uuid';

export default async function generateShortURL(url, randomString = false, startIndex = 0, endIndex = 5){
    try{
        if(!url){
            throw new Error("url is needed");
        }
        if(randomString){
            url = getRandomName()+url;
        }
        const hash = await crypto.createHash('sha256').update(url).digest('base64url');
        const shortHash = hash.substring(startIndex, endIndex + 1);
        return {hash, shortHash};
    }catch (e) {
        throw new Error(e);
    }
}

function getRandomName() {
    let hexString = v4();
    // remove decoration
    hexString = hexString.replace(/-/g, "");
    let base64String = Buffer.from(hexString, 'hex').toString('base64')
    return base64String;
}