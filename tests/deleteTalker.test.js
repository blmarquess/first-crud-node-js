const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3000';

describe('6 - Crie o endpoint DELETE /talker/:id', () => {
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
    afterAll(() =>{
      fs.writeFileSync(
        path.join(__dirname, '..', 'talker.json'),
        talkerSeed,
        'utf8',
      );
    })
  });

  it('Será validado que é possível deletar uma pessoa palestrante com sucesso', async () => {
    let resultTalker;

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
            name: 'Zendaya Maree',
            age: 24,
            talk: {
              watchedAt: '25/09/2020',
              rate: 5,
            },
          })
          .expect('status', 201)
          .then((responseCreate) => {
            const { body } = responseCreate;
            resultTalker = JSON.parse(body);
          });
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
          .delete(`${url}/talker/${resultTalker.id}`)
          .expect('status', 204)
          .then(() => {
            expect(require('../talker.json')).not.toEqual(
              expect.arrayContaining(
                [expect.objectContaining({ id: resultTalker.id})]
              )
            );
          });
      });
  });

  it('Será validado que não é possível deletar uma pessoa palestrante sem estar autorizado', async () => {
    let resultTalker;

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
            name: 'Zendaya Maree',
            age: 24,
            talk: {
              watchedAt: '25/09/2020',
              rate: 5,
            },
          })
          .expect('status', 201)
          .then((responseCreate) => {
            const { body } = responseCreate;
            resultTalker = JSON.parse(body);
          });
      });

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
          .delete(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 401)
          .then((responseDelete) => {
            const { json } = responseDelete;
            expect(json.message).toBe('Token não encontrado');
          })
      );
  });

  it('Será validado que não é possível deletar uma pessoa palestrante com token inválido', async () => {
    let resultTalker;

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
            name: 'Rihanna',
            age: 32,
            talk: { watchedAt: '23/10/2020', rate: 5 },
          })
          .expect('status', 201)
          .then((responseCreate) => {
            const { body } = responseCreate;
            resultTalker = JSON.parse(body);
          });
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '99999999',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/talker/${resultTalker.id}`)
      .expect('status', 401)
      .then((responseDelete) => {
        const { json } = responseDelete;
        expect(json.message).toBe('Token inválido');
      });
  });
});
