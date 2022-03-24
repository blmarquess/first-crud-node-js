import { Request, Response } from "express";
import { deleteTalkerService } from "../services/deleteTalkerService";

class DeleteTalkerController {
  public async deleteTalker(req: Request, res: Response): Promise<Response> {
    try {
      const talkerToDelete = await deleteTalkerService.deleteTalker(req);
      if (talkerToDelete) {
        return res.status(204).end();
      }
      throw new Error("Not found");
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export const deleteTalkerController = new DeleteTalkerController();
