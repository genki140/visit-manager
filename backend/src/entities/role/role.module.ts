import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.model';
import { RoleResolver } from './role.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleResolver],
  exports: [],
})
export class RoleModule {}
