import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArea } from './user-area.model';
import { UserAreaResolver } from './user-area.resolver';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserArea]), TypeOrmModule.forFeature([User])],
  providers: [UserService, UserAreaResolver],
  exports: [],
})
export class UserAreaModule {}
