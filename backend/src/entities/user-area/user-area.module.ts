import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArea } from './user-area.model';
import { UserAreaService } from './user-area.service';
import { UserAreaResolver } from './user-area.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserArea])],
  providers: [UserAreaService, UserAreaResolver],
  exports: [UserAreaService],
})
export class UserAreaModule {}
