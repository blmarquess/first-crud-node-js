import { readerDataModel } from "../models/readerModel";
import { ITalker } from "../types/ITalker";

class SearchService {
  public async search(term: string): Promise<ITalker[]> {
    const results = await readerDataModel.readerByName(term);

    return results;
  }
}

export const searchService = new SearchService();
