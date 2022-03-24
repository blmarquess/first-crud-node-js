import { NextFunction, Request, Response } from "express";

const TOKEN_RULES = {
  min_size: 16,
};

const RULES_INFO = {
  token_size: "Token inválido",
  token_empty: "Token não encontrado",
};

export class AuthMiddleware {
  public async token(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const {
      headers: { authorization },
    } = req;

    if (!authorization)
      return res.status(401).json({ message: RULES_INFO.token_empty });

    if (authorization.toString().length !== TOKEN_RULES.min_size) {
      return res.status(401).json({ message: RULES_INFO.token_size });
    }
    return next();
  }
}

export const authMiddleware = new AuthMiddleware();
