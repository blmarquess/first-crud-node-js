import { Request, Response, NextFunction } from "express";
import { getAllTalkersService } from "../services/getAllTalkersService";

class GetAllTalkerController {

  public async getAllTalker(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const talkers = await getAllTalkersService.getAllTalkers();
      return res.status(200).json(talkers);
    } catch (error) {
      next(error);
      return res.status(404).json({ error: error.message });
    }
  }

  public async getTalkerByUserId(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const talker = await getAllTalkersService.getTalkerByUserId(Number(id));

      return res.status(200).json(talker);
    } catch (err) {
      next(err);
      return res.status(404).json({ message: err.message });
    }
  }
}

export const getAllTalkerController = new GetAllTalkerController();