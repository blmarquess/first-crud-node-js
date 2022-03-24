import { Request, Response } from "express";
import { updateTalkerService } from "../services/updateTalkerService";

export class UpdateTalkerController {
  public async updateTalker(req: Request, res: Response): Promise<Response> {
    try {
      const talkerToUpdate = await updateTalkerService.updateTalker(req);
      return res.status(200).json(talkerToUpdate);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export const updateTalkerController = new UpdateTalkerController();
