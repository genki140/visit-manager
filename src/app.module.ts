// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// // import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';

// @Module({
//   imports: [TypeOrmModule.forRoot(), UserModule],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.graphql',
    }),
    UserModule,
  ],
})
export class AppModule {}
