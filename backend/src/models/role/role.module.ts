import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModel } from './role.model';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel])],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
