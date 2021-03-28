import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import modules
import { CategoryModule } from '@/models/category/category.module';
import { TaskModule } from '@/models/task/task.module';
import { UserModule } from '@/models/user/user.module';
import { RoleModule } from '@/models/role/role.module';
import { AbilityModule } from '@/models/ability/ability.module';

import { TaskContentModule } from '@/models/task-content/task-content.module';
import { DateScalar } from '@/scalars/date.scalar';

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
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.graphql' }),
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
    TaskModule,
    TaskContentModule,
    CategoryModule,
    UserModule,
    RoleModule,
    AbilityModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
