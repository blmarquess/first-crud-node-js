import { Request, Response } from 'express';

const HTTP_OK_STATUS = 200;

class TestController{
  public home(_request:Request, response: Response){
    response.status(HTTP_OK_STATUS).send();
  };
}

export const testController = new TestController();