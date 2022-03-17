const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const postTalkerMock = {
  name: 'Zendaya Maree',
  age: 24,
  id: 5,
  talk: { rate: 5, watchedAt: '25/09/2020' },
};

const url = 'http://localhost:3000';

describe('4 - Crie o endpoint POST /talker', () => {
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

  it('Será validado que é possível cadastrar uma pessoa palestrante com sucesso', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { rate: 5, watchedAt: '25/09/2020' },
          })
          .expect('status', 201)
          .then((responseCreate) => {
            expect(require('../talker.json')).toEqual(
              expect.arrayContaining(
                [expect.objectContaining(postTalkerMock)]
                )
            );
            const { json } = responseCreate;
            expect(json).toEqual(postTalkerMock);
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante sem nome', async () => {
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
          .post(`${url}/talker`, {
            age: 24,
            talk: { rate: 5, watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe('O campo "name" é obrigatório');
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante com nome menor que 3 caracteres', async () => {
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
          .post(`${url}/talker`, {
            name: 'Oi',
            age: 24,
            talk: { rate: 5, watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O "name" deve ter pelo menos 3 caracteres'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante sem idade', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            talk: { rate: 5, watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe('O campo "age" é obrigatório');
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante com idade menor de 18 anos', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 17,
            talk: { rate: 5, watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'A pessoa palestrante deve ser maior de idade'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante sem o campo talk', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante sem a chave rate', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante com rate menor que 1', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { rate: -1, watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O campo "rate" deve ser um inteiro de 1 à 5'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante com rate maior que 5', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { rate: 7, watchedAt: '25/09/2020' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O campo "rate" deve ser um inteiro de 1 à 5'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante sem a chave watchedAt', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { rate: 5 },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante com watchedAt sem o formato "dd/mm/aaaa"', async () => {
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
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { rate: 5, watchedAt: '42-20-3333' },
          })
          .expect('status', 400)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe(
              'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'
            );
          });
      });
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante sem estar autorizado', async () => {
    await frisby
      .post(`${url}/login`, {
        body: {
          email: 'deferiascomigo@gmail.com',
          password: '12345678',
        },
      })
      .then(() =>
        frisby
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 17,
            talk: { rate: 5, watchedAt: '25/09/2020' },
          })
          .expect('status', 401)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe('Token não encontrado');
          })
      );
  });

  it('Será validado que não é possível cadastrar uma pessoa palestrante com token inválido', async () => {
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
                Authorization: 99999999,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/talker`, {
            name: 'Zendaya Maree',
            age: 24,
            talk: { rate: 5, watchedAt: '20/10/2020' },
          })
          .expect('status', 401)
          .then((responseCreate) => {
            const { json } = responseCreate;
            expect(json.message).toBe('Token inválido');
          })
      );
  });
});
