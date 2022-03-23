import fs from 'fs/promises';
import path from 'path';

class DataBase{
  public async reader() {
    const data = await fs.readFile(path.resolve(__dirname, '../../talker.json'), 'utf-8');
    return JSON.parse(data);
  }
  public async writer(data:string) {
    await fs.writeFile(path.resolve(__dirname, '../../talker.json'), data);
    return;
  }
}

export const database = new DataBase();



