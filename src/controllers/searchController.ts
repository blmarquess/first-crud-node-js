import { Request, Response } from "express";
import { searchService } from "../services/searchService";

export class SearchController {
  public async search(req: Request, res: Response): Promise<Response> {
    const resQuery = req.query.q.toString();
    console.log(resQuery);
    try {
      const talkerSearch = await searchService.search(resQuery);
      return res.status(200).json(talkerSearch);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export const searchController = new SearchController();
