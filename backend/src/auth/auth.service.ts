// import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@/entities/user/user.model';
import { UserService } from '@/entities/user/user.service';

type PasswordOmitUser = Omit<User, 'password'>;

// interface JWTPayload {
//   userId: User['id'];
//   username: User['username'];
// }

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UserService) {}

  public logonUserId = '';

  // ユーザーを認証する
  async validateUser(username: string, password: string): Promise<PasswordOmitUser | undefined> {
    const user = await this.usersService.findByUsernameWithAbilities(username);

    if (user != null && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // パスワード情報を外部に出さないようにする
      this.logonUserId = user.username;
      return result;
    }

    return undefined;
  }

  // jwt tokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    // const payload: JWTPayload = { userId: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
