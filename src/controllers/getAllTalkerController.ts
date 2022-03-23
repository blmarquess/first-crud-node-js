import { Request, Response, NextFunction } from "express";
import {  getAllTalkersService } from "../services/getAllTalkersService";

class GetAllTalkerController {

  public async getAllTalker(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    try {
          const talkers = await getAllTalkersService.getAllTalkers();
          return res.status(200).json(talkers);
        } catch (error) {
          return res.status(404).json({ error: error.message });
        }
    }
}

export const getAllTalkerController = new GetAllTalkerController();;