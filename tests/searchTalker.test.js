const frisby = require('frisby');
const fs = require('fs');
const path = require('path');
const talkersSeed = require('./seed.json');

const url = 'http://localhost:3000';

describe('7 - Crie o endpoint GET /talker/search?q=searchTerm', () => {
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

  it('Será validado que é possível fazer uma busca por termo com sucesso', async () => {
    await frisby
      .post(`${url}/login`, {
        email: 'deferiascomigo@gmail.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/talker`, {
            name: 'Miley Cyrus',
            age: 27,
            talk: {
              watchedAt: '25/09/2020',
              rate: 4,
            },
          })
          .expect('status', 201);
      });

    await frisby
      .post(`${url}/login`, {
        email: 'deferiascomigo@gmail.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`${url}/talker/search?q=M`)
          .expect('status', 200)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  name: 'Marcos Costa',
                  age: 24,
                  id: 4,
                  talk: { watchedAt: '23/10/2020', rate: 5 },
                }),
                expect.objectContaining({
                  name: 'Miley Cyrus',
                  age: 27,
                  talk: {
                    watchedAt: '25/09/2020',
                    rate: 4,
                  },
                }),
              ])
            );
          });
      });
  });

  it('Será validado que o endpoint retonará um array com todos as pessoas palestrantes caso param seja vazio', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '12345678',
        },
      })
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`${url}/talker`)
          .expect('status', 200)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json).toEqual(talkersSeed);
          });
      });
  });

  it('Será validado que o endpoint retorna um array vazio caso o param não seja passado', async () => {
    fs.writeFileSync(path.join(__dirname, '..', 'talker.json'), '[]', 'utf8');

    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '12345678',
        },
      })
      .then((responseLogin) => {
        const { body } = responseLogin;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`${url}/talker`)
          .expect('status', 200)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json).toEqual([]);
          });
      });
  });

  it('Será validado que não é possível fazer uma busca por termo sem estar autorizado', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '12345678',
        },
      })
      .then(() =>
        frisby
          .setup()
          .get(`${url}/talker/search?q=Z`)
          .expect('status', 401)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json.message).toBe('Token não encontrado');
          })
      );
  });

  it('Será validado que não é possível fazer uma busca por termo com token inválido', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '12345678',
        },
      })
      .then(() =>
        frisby
          .setup({
            request: {
              headers: {
                Authorization: '99999999',
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`${url}/talker/search?=Ma`)
          .expect('status', 401)
          .then((responseGet) => {
            const { json } = responseGet;
            expect(json.message).toBe('Token inválido');
          })
      );
  });
});
