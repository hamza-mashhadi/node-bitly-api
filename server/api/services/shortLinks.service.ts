import l from "../../common/logger";

import { ShortLink, IShortLinksModel } from "../models/shortLinks";
import generateShortURL from "../../helper/urlGenerator";

export class bitlyService {
  //fetch all short links to display in some table
  async getAll(): Promise<IShortLinksModel[]> {
    l.info("fetch all shortLinks");
    const urls = (await ShortLink.find(
      null,
    ).select(["-_id","-__v"]).lean()) as IShortLinksModel[];
    return urls;
  }

  //a get function to retrieve a URL by its short hash
  async getById(shortHash: string): Promise<IShortLinksModel> {
    l.info(`fetch redirect url with id ${shortHash}`);

    const url = (await ShortLink.findOne(
      { shortHash: shortHash },
    ).lean()) as IShortLinksModel;

    if(!url)
      throw new Error('URL Not Found...');

    const filter = { shortHash: shortHash };
    const update = { accessCounter: url.accessCounter + 1 };
    ShortLink.findOneAndUpdate(filter, update).exec();
    return url;
  }

  async create(data: IShortLinksModel): Promise<IShortLinksModel> {
    l.info(`create short url with data ${data}`);

    //first of all we will create the hash for the given url
    //short hash is indexed so retrieval is O(1)
    let {hash,shortHash} = await generateShortURL(data.url);
    let possibleDuplicate =  await ShortLink.findOne(
        { shortHash: shortHash },
    ).lean() as IShortLinksModel;

    if(possibleDuplicate){
      if(possibleDuplicate.url == data.url){
        possibleDuplicate.creationCounter++
        const filter = { shortHash: shortHash };
        const update = { creationCounter: possibleDuplicate.creationCounter};
        ShortLink.findOneAndUpdate(filter, update).exec();
        return possibleDuplicate;
      }else{
        //this case is just for protection as our system will have a
        //possible first collision after 2^24 ~ 16M URLs
        let newHashes = await generateShortURL(data.url,true);
        hash = newHashes.hash;
        shortHash = newHashes.shortHash;
      }
    }

    //once we have our hashes sorted, and we make sure the url does not already exist in the system
    // we'll create the new URL entry in mongodb and return it back to the user
    data.hash = hash;
    data.shortHash = shortHash;
    data.accessCounter = 0;
    data.creationCounter = 1;
    const url = new ShortLink(data);
    const doc = (await url.save()) as IShortLinksModel;
    return doc;
  }

  //this function will simply return back the statistics for the url
  async getStats(shortHash: string): Promise<Object> {
    const doc = (await ShortLink.findOne(
        { shortHash: shortHash },
    ).lean()) as IShortLinksModel;
    return {url: doc.url, "Total Create Requests:": doc.creationCounter, "Total Access Requests:": doc.accessCounter}
  }
}

export default new bitlyService();
