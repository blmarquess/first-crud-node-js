const frisby = require('frisby');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:3000';

describe('5 - Crie o endpoint PUT /talker/:id', () => {
  beforeEach(() => {
    const talkerMock = fs.readFileSync(
      path.join(__dirname, 'seed.json'),
      'utf8'
    );

    fs.writeFileSync(
      path.join(__dirname, '..', 'talker.json'),
      talkerMock,
      'utf8'
    );
  });

  it('Será validado que é possível editar uma pessoa palestrante com sucesso', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 200)
          .then((responseUpdate) => {
            expect(require('../talker.json')).toEqual(
              expect.arrayContaining(
                [expect.objectContaining({
                  id: resultTalker.id,
                  name: 'Zendaya',
                  age: 25,
                  talk: {
                    watchedAt: '24/10/2020',
                    rate: 4,
                  }
                })]
              )
            );
            const { json } = responseUpdate;
            expect(json.id).toBe(resultTalker.id);
            expect(json.name).toBe('Zendaya');
            expect(json.age).toBe(25);
            expect(json.talk.watchedAt).toBe('24/10/2020');
            expect(json.talk.rate).toBe(4);
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante sem nome', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('O campo "name" é obrigatório');
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante com nome menor que 3 caracteres', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Ze',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O "name" deve ter pelo menos 3 caracteres'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante sem idade', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('O campo "age" é obrigatório');
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante com idade menor de 18 anos', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 17,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('A pessoa palestrante deve ser maior de idade');
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante sem o campo talk', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante sem a chave rate', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante com rate menor que 1', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 0,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "rate" deve ser um inteiro de 1 à 5'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante com rate maior que 5', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 7,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "rate" deve ser um inteiro de 1 à 5'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante sem a chave watchedAt', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              rate: 4,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante com watchedAt sem o formato "dd/mm/aaaa"', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '42-20-3333',
              rate: 4,
            },
          })
          .expect('status', 400)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe(
              'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'
            );
          });
      });
  });

  it('Será validado que não é possível editar uma pessoa palestrante sem estar autorizado', async () => {
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
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 401)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('Token não encontrado');
          })
      );
  });

  it('Será validado que não é possível editar uma pessoa palestrante com token inválido', async () => {
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
          .setup({
            request: {
              headers: {
                Authorization: '9999999',
                'Content-Type': 'application/json',
              },
            },
          })
          .put(`${url}/talker/${resultTalker.id}`, {
            name: 'Zendaya',
            age: 25,
            talk: {
              watchedAt: '24/10/2020',
              rate: 4,
            },
          })
          .expect('status', 401)
          .then((responseUpdate) => {
            const { json } = responseUpdate;
            expect(json.message).toBe('Token inválido');
          })
      );
  });
});
