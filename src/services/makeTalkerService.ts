import { readerDataModel } from "../models/readerModel";
import { recordModel } from "../models/recordModel";
import { ITalker } from "../types/ITalker";

class MakeTalkerService {
  private async getData(): Promise<ITalker[]> {
    const data = await readerDataModel.readerAll();
    return data;
  }

  public async execute(talker: ITalker): Promise<ITalker> {
    const dbIDs = await this.getData();
    const maxID = Math.max(...dbIDs.map((item: ITalker) => item.id));

    const newTalker: ITalker = {
      name: talker.name,
      age: talker.age,
      talk: talker.talk,
      id: maxID + 1,
    };

    await recordModel.create(newTalker);

    return newTalker;
  }

  public formatTalker(talker: ITalker): ITalker {
    const newTalker: ITalker = {
      name: talker.name,
      age: talker.age,
      talk: talker.talk,
      id: talker.id,
    };

    return newTalker;
  }
}

export const makeTalkerService = new MakeTalkerService();
