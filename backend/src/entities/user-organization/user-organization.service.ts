import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserOrganization } from './user-organization.model';

@Injectable()
export class UserOrganizationService {
  constructor(
    @InjectRepository(UserOrganization)
    private readonly userOrganizationRepository: Repository<UserOrganization>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<UserOrganization>) {
    if (ids == null) {
      return this.userOrganizationRepository.find(options);
    } else {
      return this.userOrganizationRepository.findByIds(ids, options);
    }
  }
}
