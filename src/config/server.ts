import express from 'express';
import bodyParser from 'body-parser';
import { router } from '../router/router';

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }
  private middleware(): void {
    this.server.use(bodyParser.json());
  }

  public router() {
    this.server.use(router);
  }
}