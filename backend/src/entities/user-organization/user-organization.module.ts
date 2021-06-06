import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../organization/organization.model';
import { UserOrganization } from './user-organization.model';
import { UserOrganizationResolver } from './user-organization.resolver';
import { UserOrganizationService } from './user-organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, UserOrganization])],
  providers: [UserOrganizationService, UserOrganizationResolver],
  exports: [UserOrganizationService],
})
export class UserOrganizationModule {}
