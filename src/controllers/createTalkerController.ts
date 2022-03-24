import { Request, Response } from "express";
import { makeTalkerService } from "../services/makeTalkerService";
import { validatorTalkerService } from "../services/validatorTalkerService";

export class CreateTalkerController {
  public async createTalker(req: Request, res: Response): Promise<Response> {
    try {
      const newTalker = await validatorTalkerService.createTalker(req.body);
      if (newTalker.status) {
        const regiTalker = await makeTalkerService.execute(req.body);
        return res.status(201).json(regiTalker);
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export const createTalkerController = new CreateTalkerController();
