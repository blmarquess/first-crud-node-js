import { DataBase } from "./database";
import { ITalker } from "../types/ITalker";

export class ReaderDataModel extends DataBase {
  public async readerAll(): Promise<ITalker[]> {
    const data = await this.reader();
    return data;
  }

  public async readerOneById(id: number): Promise<ITalker> {
    const data = await this.reader();
    return data.find((item: ITalker) => item.id === id);
  }

  public async readerByName(name: string): Promise<ITalker[]> {
    const data = await this.reader();
    return data.filter((item: ITalker) => item.name.includes(name));
  }
}
export const readerDataModel = new ReaderDataModel();
