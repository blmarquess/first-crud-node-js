import { NextFunction, Request, Response } from "express";
import { ITalker } from "../types/ITalker";
import {
  hasUndefined,
  isValidDateShape,
  isValidRate,
  testUserRules,
} from "../utils/createUserSubService";

const talkerStackTest = (req: ITalker) => {
  const { name, age, talk } = req;

  const hasUndefinedInfo = hasUndefined({ name, age, talk });
  if (!hasUndefinedInfo.status) {
    return hasUndefined({ name, age, talk });
  }

  const userData = testUserRules(name, age);
  if (!userData.status) {
    return userData;
  }

  const checkDate = isValidDateShape(talk);
  if (!checkDate.status) {
    return checkDate;
  }

  const checkRate = isValidRate(talk);
  if (!checkRate.status) {
    return checkRate;
  }

  return { status: true, msgError: "User OK..." };
};

export class ValidatorTalkerMiddleware {
  public async createTalker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const talkerStack = talkerStackTest(req.body);
    if (!talkerStack.status) {
      return res.status(400).json({ message: talkerStack.msgError });
    }
    return next();
  }
}

export const validatorTalkerMiddleware = new ValidatorTalkerMiddleware();
