import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganization } from './user-organization.model';
import { UserOrganizationService } from './user-organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization])],
  providers: [UserOrganizationService], //, OrganizationResolver],
  exports: [UserOrganizationService],
})
export class UserOrganizationModule {}
