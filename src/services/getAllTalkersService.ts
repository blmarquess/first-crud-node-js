import { database } from '../models/database';

export class GetAllTalkerService {

  public async getAllTalkers() {
    const talkers = await database.reader();
    return talkers;
  }
}

export const getAllTalkersService = new GetAllTalkerService();