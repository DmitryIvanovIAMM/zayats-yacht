import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const encode = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.secretKey,
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
