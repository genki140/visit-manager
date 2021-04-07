import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';

// Import modules
import { UserModule } from '@/entities/user/user.module';
import { OrganizationModule } from './entities/organization/organization.module';
import { RoledUserModule } from './entities/roled-user/roled-user.module';
import { RoleModule } from '@/entities/role/role.module';
import { AbilityModule } from '@/entities/ability/ability.module';

import { DateScalar } from '@/scalars/date.scalar';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

type EnvironmentVariables = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SOCKET_PATH?: string;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // envファイルを読み込むために使用
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }), //GraphQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'mysql',
        host: configService.get('DB_HOST') || 'db',
        port: configService.get('DB_PORT') || 3306,
        username: configService.get('DB_USERNAME') || 'username',
        password: configService.get('DB_PASSWORD') || 'password',
        database: configService.get('DB_NAME') || 'database',
        // extra: { socketPath: configService.get('DB_SOCKET_PATH') },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    RoleModule,
    AbilityModule,
    AuthModule,
    OrganizationModule,
    RoledUserModule,
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
