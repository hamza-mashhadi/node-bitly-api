import bitlyService from "../../services/shortLinks.service";
import { Request, Response, NextFunction } from "express";

export class Controller {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const docs = await bitlyService.getAll();
      return res.status(200).json(docs);
    } catch (err) {
      return next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await bitlyService.getById(req.params.id);
      if (doc != null) {
        //if the short link is found the API will send a redirect header
        // so that the user can be redirected to the original link
        let redirectURL = doc.url;
        if(req.query.params){
          redirectURL = redirectURL+`?params=${req.query.params}`
        }
        return res.redirect(redirectURL);
      }
      const errors = [{ message: "Example not found" }];
      return res.status(404).json({ errors });
    } catch (err) {
      return next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await bitlyService.create(req.body);
      let baseURL = process.env.BASE_URL || `localhost:3000/api/v1/`;
      let response = {
      'short code': doc.shortHash,
      'short link': `${baseURL}${doc.shortHash}`,
      'Total Times Accessed:': doc.accessCounter,
      'Total Times Created:': doc.creationCounter,
      }
      return res.status(201).send(response);
    } catch (err) {
      return next(err);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await bitlyService.getStats(req.params.id);
      return res.status(201).send(doc);
    } catch (err) {
      return next(err);
    }
  }


}
export default new Controller();
