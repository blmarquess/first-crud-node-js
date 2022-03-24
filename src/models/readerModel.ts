import { DataBase } from "./database";
import { ITalker } from "../types/ITalker";

export class ReaderDataModel extends DataBase {
  public async readerAll() {
    const data = await this.reader();
    return data;
  }

  public async readerOneById(id: number) {
    const data = await this.reader();
    return data.find((item: ITalker) => item.id === id);
  }

  public async readerOneByName(name: string) {
    const data = await this.reader();
    return data.find((item: ITalker) => item.name.includes(name));
  }
}
export const readerDataModel = new ReaderDataModel();
