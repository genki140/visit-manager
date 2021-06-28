import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

// Strategyクラス
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import * as fs from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user/user.model';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    // JWTを使うための設定をしている
    JwtModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: async (configService: ConfigService) => {
        return {
          // ファイルから秘密鍵を渡す
          secret: fs.readFileSync('/home/nestjs/keys/id_rsa', 'utf8'),
          // signOptions: {
          //   // 有効期間を設定
          //   // 指定する値は以下を参照
          //   // https://github.com/vercel/ms
          //   expiresIn: '7 days', // '1200s', //20分
          // },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
