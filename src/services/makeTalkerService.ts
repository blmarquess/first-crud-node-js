import { readerDataModel } from "../models/readerModel";
import { recordModel } from "../models/recordModel";
import { ITalker } from "../types/ITalker";

class MakeTalkerService {
  public async execute(talker: ITalker): Promise<any> {
    const dbIDs = await readerDataModel.readerAll();
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
}

export const makeTalkerService = new MakeTalkerService();
