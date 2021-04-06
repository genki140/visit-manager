import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoledUser } from './roled-user.model';

@Module({
  imports: [TypeOrmModule.forFeature([RoledUser])],
  // providers: [OrganizationService, OrganizationResolver],
  // exports: [OrganizationService],
})
export class RoledUserModule {}
