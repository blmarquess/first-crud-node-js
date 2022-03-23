export const customUUID = (length:number) => [...new Array(length)]
  .map(() => Math.random().toString(32)[5]).join('');

