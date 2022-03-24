export interface ITalkerInfo {
  watchedAt?: string;
  rate?: number;
}

export interface ITalker {
  id?: number;
  name?: string;
  age?: number;
  talk?: ITalkerInfo;
}