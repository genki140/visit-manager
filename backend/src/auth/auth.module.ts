import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

// Strategyクラス
// import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '@/entities/user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,

    // JWTを使うための設定をしている
    JwtModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: async (configService: ConfigService) => {
        return {
          // envファイルから秘密鍵を渡す
          secret: `-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,3703F2E32E5ACD29B74F61707732D67E

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
-----END RSA PRIVATE KEY-----`,
          signOptions: {
            // 有効期間を設定
            // 指定する値は以下を参照
            // https://github.com/vercel/ms
            expiresIn: '7 days', // '1200s', //20分
          },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
  ],
  // providers: [AuthService, LocalStrategy, JwtStrategy],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
