export const delay = (time: number) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, time);
  });
