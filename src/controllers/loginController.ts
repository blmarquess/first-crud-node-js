import { NextFunction, Request, Response } from 'express';
import { loginService } from '../services/loginService';

export class LoginController {
  public async login(rec: Request, res: Response, next: NextFunction): Promise<Response> {
    const { email, password } = rec.body;
    try {
      const newToken = await loginService.login(email, password);
      return res.status(200).json({ token: newToken });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export const loginController = new LoginController();