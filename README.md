# First CRUD with NodeJS extends Talker Manager from [beTrybe](https://www.betrybe.com/)

## Requisitos do projeto

- 1 - Crie o endpoint GET /talker
- 2 - Crie o endpoint GET /talker/:id
- 3 - Crie o endpoint POST /login
- 4 - Crie o endpoint POST /talker
- 5 - Crie o endpoint PUT /talker/:id
- 6 - Crie o endpoint DELETE /talker/:id
- 7 - Crie o endpoint GET /talker/search?q=searchTerm

## Habilidades

Neste projeto, verificamos se você é capaz de:

- Realizar operações assíncronas utilizando callbacks;
- Realizar operações assíncronas utilizando Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Escrever seus próprios scripts que criam e consomem Promises;
- Reescrever código que usa callbacks para que use Promises;
- Realizar chamadas de funções de forma consciente;
- Entender os conceitos básicos de como o JavaScript funciona;
- Detectar e solucionar problemas no código de forma mais objetiva;
- Entender a diferença entre execução síncrona e assíncrona;
- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express;
- Escrever APIs utilizando Node e Express;
- Entender a estrutura de uma aplicação Express e como organizar seu código;
- Criar rotas e aplicar middleware's.

> O que foi abordado até este momento do curso
> JavaScript - O Básico de NodeJS e Express
---

## Entrega além dos requisitos

- Fazer o projeto utilizando [TypeScript](https://www.typescriptlang.org/)
- Montar a arquitetura do projeto em camadas 'MSC'
- Seguir o paradigma orientado a objetos
- Commits padronizados seguindo [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)

### Exemplo de um dos requisitos - Crie o endpoint GET `/talker/:id`

- Ao acessar o servidor na porta 3000 na rota talker/:id tem que retornar as informações da Talker com id correspondente

>Exemplo de acesso: http://
>localhost:3000:/talker/2

|Resposta esperada

```json
{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": { "watchedAt": "23/10/2020", "rate": 5 }
}
```

### Para conseguir rodar e testar a aplicação em sua maquina siga os passos abaixo

>Precisa ter o Git e NodeJS instalado e funcionando na maquina

Abra o emulador de terminal e clone o repositório:
>precisa estar logado no github caso contrario baixe o arquivo .zip aqui

```shell
git clone git@github.com:blmarquess/first-crud-node-js.git
````

Entre na pasta da aplicação e execute o comando abaixo para instalar as dependências do projeto:

```shell
npm install
````

Nesse pondo ele ja estará pronto para ser iniciado

Utilize o comando abaixo para iniciar a plicação:

```shell
npm start
````

Tudo dando certo você vera algo parecido com o este retorno abaixo:

```console
> first-crud-node-js@1.0.0 start
> ts-node --transpileOnly index.ts

Online
```

Agora pode acessar o endereço <http://localhost:3000/talker> para ver o resultado.

#### Funcionamento

- acessando a url localhost:3000/talker recebera o retorno de todas as palestras agendadas
- acessando a url localhost:3000/talker/2 você vera a palestra agendada de ID 2
- acessando a url localhost:3000/talker//search?q=NOME "trocando NOME para o nome a pesquisar" ex:localhost:3000/talker//search?q=bruno retornara as informações das palestras agendadas para esta pessoa

<div  align="center">
<p align="center">Contatos: <br></p>

<p align="center" style="max-width: 50%;">
 <h3>Bruno Marques</h3>
  <a href="https://www.linkedin.com/in/00brunomarques/" alt="Linkedin" rel="nofollow">
  <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" style="max-width: 100%;">
  </a>
  <a href="https://github.com/blmarquess" alt="github" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-000000?&style=flat-square&logo=GitHub&logoColor=white" style="max-width: 100%;">
  </a>
</p>
<div>
