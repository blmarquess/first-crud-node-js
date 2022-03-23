interface ITalkerInfo {
  watched?: string[];
  rate?: number;
}

export interface ITalker {
  id?: number;
  name?: string;
  age?: number;
  talk?: ITalkerInfo;
}