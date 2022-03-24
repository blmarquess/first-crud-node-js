import fs from 'fs/promises';
import path from 'path';
import { ITalker } from "../types/ITalker";

export class DataBase {
  public async reader() {
    const data = await fs.readFile(
      path.resolve(__dirname, "../../talker.json"),
      "utf-8"
    );
    return JSON.parse(data);
  }

  public async writer(data: string) {
    await fs.writeFile(path.resolve(__dirname, "../../talker.json"), data);
    return;
  }

  public async addNewTalker(talker: ITalker) {
    const data = await this.reader();
    const newData = [...data, talker];
    await this.writer(JSON.stringify(newData));
  }
}

export const database = new DataBase();
