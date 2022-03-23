export const MAIL_VALID = /^[a-z0-9._-]+@[a-z]+\.com$/;

export const MIN_PSW_SIZE = 6;

export const USER_ERRO = {
  EMAIL_NOT_VALID: 'O "email" deve ter o formato "email@email.com"',
  EMAIL_NOT_FOUND: 'O campo "email" é obrigatório',
  PASSWORD_NOT_VALID: 'O "password" deve ter pelo menos 6 caracteres',
  PASSWORD_NOT_FOUND: 'O campo "password" é obrigatório',
};

export const isEmailValid = (email: string): boolean => MAIL_VALID.test(email);

export const isPasswordValid = (pass: string): boolean => pass.length > MIN_PSW_SIZE;
