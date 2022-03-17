const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3000';

describe('2 - Crie o endpoint GET /talker/:id', () => {
  beforeEach(() => {
    const talkerSeed = fs.readFileSync(
      path.join(__dirname, 'seed.json'),
      'utf8'
    );

    fs.writeFileSync(
      path.join(__dirname, '..', 'talker.json'),
      talkerSeed,
      'utf8'
    );
  });

  it('Será validado que o endpoint retorna uma pessoa palestrante com base no id da rota', async () => {
    await frisby
      .get(`${url}/talker/1`)
      .expect('status', 200)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json).toEqual({
          name: 'Henrique Albuquerque',
          age: 62,
          id: 1,
          talk: { watchedAt: '23/10/2020', rate: 5 },
        });
      });
  });

  it('Será validado que o endpoint retonar um erro caso nenhuma pessoa palestrante seja encontrada', async () => {
    await frisby
      .get(`${url}/talker/9`)
      .expect('status', 404)
      .then((responseGet) => {
        const { json } = responseGet;
        expect(json.message).toBe('Pessoa palestrante não encontrada');
      });
  });
});
