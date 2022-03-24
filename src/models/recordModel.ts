import { ITalker } from "../types/ITalker";
import { DataBase } from "./database";

export class RecordModel extends DataBase {
  public async create(talker: ITalker): Promise<ITalker | void> {
    const data = await this.reader();
    const newData = [...data, talker];

    await this.writer(JSON.stringify(newData));
  }

  public async update(talker: ITalker): Promise<ITalker | void> {
    const data = await this.reader();
    const newData = data.map((item: ITalker) => {
      if (item.id === talker.id) {
        return talker;
      }
      return item;
    });

    await this.writer(JSON.stringify(newData));
  }

  public async delete(id: number): Promise<ITalker | void> {
    const data = await this.reader();
    const newData = data.filter((item: ITalker) => item.id !== id);

    await this.writer(JSON.stringify(newData));
  }
}

export const recordModel = new RecordModel();
