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

export class ValidatorTalkerService {
  public async createTalker(req: ITalker) {
    const talkerStack = talkerStackTest(req);
    if (!talkerStack.status) {
      throw new Error(talkerStack.msgError);
    }
    return talkerStack;
  }
}

export const validatorTalkerService = new ValidatorTalkerService();
