import * as jwt from 'jsonwebtoken';

export const encode = (payload: string | Buffer | object) => {
  return new Promise((resolve, reject) => {
    const { SECRET_KEY } = process.env;
    jwt.sign(
      payload,
      SECRET_KEY as string,
      {
        expiresIn: 31556926 // 1 year in seconds
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
};
