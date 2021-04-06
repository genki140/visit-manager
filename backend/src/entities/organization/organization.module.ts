/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Module } from '@nestjs/common';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
  providers: [OrganizationResolver, OrganizationService],
})
export class OrganizationModule {}
