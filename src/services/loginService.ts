import { customUUID } from '../utils/genToken';
import { isEmailValid, isPasswordValid, USER_ERRO } from '../utils/loginTools';

const TOKEN_SIZE:number = 16;

export class LoginService {
  public async login(email: string, password: string): Promise<string | Error> {
    if (!email) { throw new Error(USER_ERRO.EMAIL_NOT_FOUND); }

    if (!isEmailValid(email)) { throw new Error(USER_ERRO.EMAIL_NOT_VALID); }

    if (!password) { throw new Error(USER_ERRO.PASSWORD_NOT_FOUND); }

    if (!isPasswordValid(password.toString())) {
      throw new Error(USER_ERRO.PASSWORD_NOT_VALID);
    }

    const newToken = customUUID(TOKEN_SIZE);
    return newToken;
  }
}

export const loginService = new LoginService();