import { database } from '../models/database';
import { ITalker } from '../types/ITalker';

export class GetAllTalkerService {

  public async getAllTalkers() {
    const talkers = await database.reader();
    return talkers;
  }

  public async getTalkerByUserId(userId: number) {
    const talkers = await database.reader();
    const talker = talkers.find((talker: ITalker) => talker.id === userId);
    if (!talker) {
      throw new Error('Pessoa palestrante não encontrada');
    }
    return talker;
  }
}

export const getAllTalkersService = new GetAllTalkerService();