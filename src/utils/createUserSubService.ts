import { ITalker, ITalkerInfo } from "../types/ITalker";

const USER_LAYOUT = {
  age_min: 18,
  name_size: 3,
  rate: /[1-5]/,
  watchedAt: "dd/mm/yyyy",
};

const USER_RULES = {
  date_split: "/",
  date_error: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  user_empty: 'O campo "name" é obrigatório',
  name_min_size: 'O "name" deve ter pelo menos 3 caracteres',
  age_empty: 'O campo "age" é obrigatório',
  age_min: "A pessoa palestrante deve ser maior de idade",
  rate_range: 'O campo "rate" deve ser um inteiro de 1 à 5',
  talk_empty:
    'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

export const isValidDateShape = (date: ITalkerInfo) => {
  const erroMessage = { status: false, msgError: USER_RULES.date_error };
  const { watchedAt } = date;
  const itDate = watchedAt
    .split(USER_RULES.date_split)
    .map((n: string) => Number(n));

  if (itDate.length !== 3) return erroMessage;
  if (itDate.some((i: number) => Number.isNaN(i))) return erroMessage;

  return { status: true, msgError: "DateRulesOk..." };
};

const hasUndefinedInTalk = (talk: ITalkerInfo) => {
  if (!("rate" in talk) || !("watchedAt" in talk)) {
    return { status: false, msgError: USER_RULES.talk_empty };
  }
  return { status: true, msgError: "Data is Informed.." };
};

export const hasUndefined = ({ name, age, talk }: ITalker) => {
  if (!talk) return { status: false, msgError: USER_RULES.talk_empty };
  if (!name) return { status: false, msgError: USER_RULES.user_empty };
  if (!age) return { status: false, msgError: USER_RULES.age_empty };
  return hasUndefinedInTalk(talk);
};

export const testUserRules = (name: string, age: number) => {
  if (name.length < USER_LAYOUT.name_size) {
    return { status: false, msgError: USER_RULES.name_min_size };
  }

  if (age < USER_LAYOUT.age_min) {
    return { status: false, msgError: USER_RULES.age_min };
  }
  return { status: true, msgError: "UserRulesOk..." };
};

export const isValidRate = (num: ITalkerInfo) => {
  const { rate } = num;
  if (rate > 5 || rate < 1) {
    return { status: false, msgError: USER_RULES.rate_range };
  }
  return { status: true, msgError: "Rate Ok..." };
};
