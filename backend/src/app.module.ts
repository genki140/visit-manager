import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';

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

import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // envファイルを読み込むために使用
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }), //GraphQL
    // TypeOrmModule.forRoot(),
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
