import { Request } from "express";
import { readerDataModel } from "../models/readerModel";
import { recordModel } from "../models/recordModel";
import { ITalker } from "../types/ITalker";

class DeleteTalkerService {
  public async deleteTalker(req: Request): Promise<ITalker | boolean> {
    const { id } = req.params;
    const itID = parseInt(id, 10);

    await recordModel.delete(itID);

    const isDone = await readerDataModel.readerOneById(itID);

    if (!isDone) {
      return true;
    }
    return false;
  }
}

export const deleteTalkerService = new DeleteTalkerService();
