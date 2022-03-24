import { database } from "../models/database";
import { modelTalker } from "../models/talkerModel";
import { ITalker } from "../types/ITalker";

class MakeTalkerService {
  public async execute(talker: ITalker): Promise<any> {
    const dbIDs = await database.reader();
    const maxID = Math.max(...dbIDs.map((item: ITalker) => item.id));

    const newTalker: ITalker = {
      name: talker.name,
      age: talker.age,
      talk: talker.talk,
      id: maxID + 1,
    };

    await modelTalker.create(newTalker);

    return newTalker;
  }
}

export const makeTalkerService = new MakeTalkerService();
