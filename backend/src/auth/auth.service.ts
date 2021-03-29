// import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@/models/user/user.model';
import { UserService } from '@/models/user/user.service';

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
  userId: User['id'];
  username: User['userId'];
}

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UserService) {}

  public logonUserId = '';

  // ユーザーを認証する
  async validateUser(username: string, password: string): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.findByUserId(username);

    // // DBに保存されているpasswordはハッシュ化されている事を想定しているので、
    // // bcryptなどを使ってパスワードを判定する
    // if (user && bcrypt.compareSync(pass, user.password)) {
    //   const { password, ...result } = user; // パスワード情報を外部に出さないようにする

    //   return result;
    // }

    if (user != null && user.password === password) {
      const { password, ...result } = user; // パスワード情報を外部に出さないようにする
      this.logonUserId = user.userId;
      return result;
    }

    return null;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    const payload: JWTPayload = { userId: user.id, username: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
