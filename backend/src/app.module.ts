import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '@/scalars/date.scalar';

// Import modules
import { UserModule } from '@/entities/user/user.module';
import { OrganizationModule } from './entities/organization/organization.module';
import { RoledUserModule } from './entities/roled-user/roled-user.module';
import { RoleModule } from '@/entities/role/role.module';
import { AbilityModule } from '@/entities/ability/ability.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AreaModule } from './entities/area/area.module';
import { UserAreaModule } from './entities/user-area/user-area.module';

import { PolygonModule } from './entities/polygon/polygon.module';
import { PolygonPointModule } from './entities/polygon-point/polygon-point.module';

import { ResidenceModule } from './entities/residence/residence.module';
import { ResidentModule } from './entities/resident/resident.module';

import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local'] }), // envファイルを読み込むために使用
    GraphQLModule.forRootAsync({
      useFactory: async () => ({
        // プロダクションモードではファイル出力しない
        autoSchemaFile: process.env.NODE_ENV === 'production' ? true : 'schema.graphql',

        installSubscriptionHandlers: true, //websocket
        context: ({ req, connection }) => {
          // websocketモードの場合にguardやjwt.strategyで認証できるよう調整
          return connection ? { req: { headers: connection.context } } : { req };
        },

        playground: {
          // endpoint: process.env.NODE_ENV === 'production' ? '/system/graphql' : undefined, // クライアントサイドからプロキシ表示されるためそちらのパスに合わせる。
          endpoint: '/system/graphql', // クライアントサイドからプロキシ表示されるためそちらのパスに合わせる。
        },

        // playground: {
        //   settings: {
        //     'request.credentials': 'include',
        //   },
        // },
        // cors: {
        //   credentials: true,
        //   origin: ['http://localhost:3000'],
        // },
        // subscriptions: {
        //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //   onConnect: async (params, websocket) => params,
        // },
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
    RoledUserModule,
    AreaModule,
    UserAreaModule,
    PolygonModule,
    PolygonPointModule,
    ResidenceModule,
    ResidentModule,
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
