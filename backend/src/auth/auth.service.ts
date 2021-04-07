// import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@/entities/user/user.model';
import { UserService } from '@/entities/user/user.service';

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UserService) {}

  // ユーザーを認証する
  async validateUser(username: string, password: string): Promise<User | undefined> {
    const user = (
      await this.usersService.find(undefined, {
        where: { username },
        relations: ['roledUsers', 'roledUsers.organization', 'roledUsers.roles', 'roledUsers.roles.abilities'],
      })
    )[0];

    if (user != null && user.password === password) {
      user.password = '';
      return user;
    }
    return undefined;
  }

  // jwt tokenを返す
  getToken(user: User) {
    return this.jwtService.sign(Object.assign({}, user));
  }
}
