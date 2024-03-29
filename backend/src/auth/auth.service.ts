// import bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@/entities/user/user.model';
import { CryptUtil } from '@/utils/crypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ユーザーを認証する
  async validateUser(username: string, password: string): Promise<User | undefined> {
    return this.getUser(username, password);
  }

  async getUser(username: string, password?: string): Promise<User | undefined> {
    // ユーザーに関する情報を一通り取得する部分はGraphqlではなくAPIで行っている。
    // graphqlでhookしないで非同期で取ってくる方法があれば、graphqlで取ってきた方ががいいかもしれない。
    // URLの区域名をIDに変換する部分はクライアントで行うので、関連組織の区域の名称-ID対応はすべて取得しておく必要がある。

    const user = (
      await this.userRepository.find({
        where: { username },
      })
    )?.[0];

    if (password != null && CryptUtil.check(password, user.password) === false) {
      return undefined;
    }

    if (user != null) {
      user.password = '';
      return user;
    }
    return undefined;
  }

  // jwt tokenを返す
  getToken(user: User) {
    return this.jwtService.sign(Object.assign({}, user));
  }

  async getUserRole(id: number): Promise<User> {
    const user = (
      await this.userRepository.findByIds([id], {
        relations: [
          'userOrganizations',
          'userOrganizations.organization',
          'userOrganizations.roles',
          'userOrganizations.roles.abilities',
          // 'userOrganizations.organization.areas',
          // 'userAreas',
        ],
      })
    )?.[0];
    user.password = '';
    return user;
  }
}
