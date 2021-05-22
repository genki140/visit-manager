// import先が'passport-local'では無い事に注意！
import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@/entities/user/user.model';
import * as fs from 'fs';

// cookie
// https://wanago.io/2020/05/25/api-nestjs-authenticating-users-bcrypt-passport-jwt-cookies/

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // クッキーからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const auth = request?.cookies?.access_token ?? '';
          return auth;
        },
      ]),
      // ファイルから秘密鍵を渡す
      secretOrKey: fs.readFileSync('/home/nestjs/keys/id_rsa', 'utf8'),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,

      // // Authorization bearerからトークンを読み込む関数を返す
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // ここでPayloadを使ったバリデーション処理を実行できる
  // Payloadは、AuthService.login()で定義した値
  async validate(payload: User): Promise<User> {
    return payload;
  }
}
