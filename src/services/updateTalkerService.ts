import { Request } from "express";
import { makeTalkerService } from "../services/makeTalkerService";
import { recordModel } from "../models/recordModel";
import { ITalker } from "../types/ITalker";
import { readerDataModel } from "../models/readerModel";

export class UpdateTalkerService {
  public async updateTalker(req: Request): Promise<ITalker[] | Object> {
    const { id } = req.params;
    const itID = parseInt(id, 10);
    const { name, age, talk } = req.body;
    const UpDataTalker = makeTalkerService.formatTalker({
      id: itID,
      name,
      age,
      talk,
    });
    await recordModel.update(UpDataTalker);

    const doneQuest = await readerDataModel.readerAll();

    if (doneQuest.find((item: ITalker) => item.id === itID)) {
      return UpDataTalker;
    }
    return { message: "Not found" };
  }
}

export const updateTalkerService = new UpdateTalkerService();
