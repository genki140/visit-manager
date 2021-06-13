import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '@/scalars/date.scalar';

// Import modules
import { UserModule } from '@/entities/user/user.module';
import { OrganizationModule } from './entities/organization/organization.module';
import { UserOrganizationModule } from './entities/user-organization/user-organization.module';
import { RoleModule } from '@/entities/role/role.module';
import { AbilityModule } from '@/entities/ability/ability.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AreaModule } from './entities/area/area.module';
import { UserAreaModule } from './entities/user-area/user-area.module';
import { OutlineModule } from './entities/outline/outline.module';
import { OutlinePointModule } from './entities/outline-point/outline-point.module';
import { ResidenceModule } from './entities/residence/residence.module';
import { ResidentModule } from './entities/resident/resident.module';

import { getConnectionOptions } from 'typeorm';
import { AreaTypeModule } from './entities/area-type/area-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local'] }), // envファイルを読み込むために使用
    GraphQLModule.forRootAsync({
      useFactory: async () => ({
        // プロダクションモードではファイル出力しない
        autoSchemaFile: process.env.NODE_ENV === 'production' ? true : 'schema.graphql',

        installSubscriptionHandlers: true, //websocket
        context: ({ req, connection }) => {
          // console.log(connection);
          // return req; //.cookies;

          // console.log('req');
          // console.log(req);
          // console.log('connection');
          // console.log(connection);

          // // websocketモードの場合にguardやjwt.strategyで認証できるよう調整
          return connection ? { req: { cookies: connection.context } } : { req };
        },

        introspection: true, // 本番環境でのplaygroundを許可
        playground: {
          // endpoint: process.env.NODE_ENV === 'production' ? '/system/graphql' : undefined, // クライアントサイドからプロキシ表示されるためそちらのパスに合わせる。
          endpoint: '/system/graphql', // クライアントサイドからプロキシ表示されるためそちらのパスに合わせる。
          settings: {
            'request.credentials': 'include',
          },
        },
        // cors: { Credential: true },

        // cors: {
        //   credentials: true,
        //   origin: ['http://localhost:3000'],
        // },
        subscriptions: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onConnect: async (params, websocket) => {
            // クッキーのトークンを引き渡す
            const tokenKey = 'access_token';
            const cookie = (websocket as any).upgradeReq.headers.cookie as string | undefined;
            const tokenValue =
              cookie
                ?.split(';')
                ?.map((x) => x.trim())
                ?.filter((x) => x.startsWith(tokenKey + '='))?.[0]
                ?.substring(tokenKey.length + 1) ?? '';
            // console.log(tokenValue);
            return {
              access_token: tokenValue,
            };
            // console.log(tokenValue);
            // return params;
          },
        },
      }),
    }), //GraphQL
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true, // これはnest独自のものらしい
        }),
    }),
    UserModule,
    RoleModule,
    AbilityModule,
    AuthModule,
    OrganizationModule,
    UserOrganizationModule,
    AreaModule,
    UserAreaModule,
    OutlineModule,
    OutlinePointModule,
    ResidenceModule,
    ResidentModule,
    AreaTypeModule,
  ],
  controllers: [AuthController],
  providers: [
    DateScalar,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
