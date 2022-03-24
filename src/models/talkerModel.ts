import { ITalker } from "../types/ITalker";
import { database } from "./database";

export class ModelTalker {
  public async create(talker: ITalker): Promise<ITalker | void> {
    const data = await database.reader();
    const newData = [...data, talker];

    await database.writer(JSON.stringify(newData));
  }
}

export const modelTalker = new ModelTalker();
