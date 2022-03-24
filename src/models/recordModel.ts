import { ITalker } from "../types/ITalker";
import { DataBase } from "./database";

export class RecordModel extends DataBase {
  public async create(talker: ITalker): Promise<ITalker | void> {
    const data = await this.reader();
    const newData = [...data, talker];

    await this.writer(JSON.stringify(newData));
  }
}

export const recordModel = new RecordModel();
