// パスワードハッシュか方式として、bcryptを採用

import { hashSync, compareSync } from 'bcryptjs';

export class CryptUtil {
  static create = (password: string) => {
    const saltRounds = 10; //ストレッチング回数(乗数)
    return hashSync(password, saltRounds);
  };

  static check = (password: string, hash: string) => {
    return compareSync(password, hash);
  };
}
