import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Organization } from './organization.model';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<Organization>) {
    if (ids == null) {
      return this.organizationRepository.find(options);
    } else {
      return this.organizationRepository.findByIds(ids, options);
    }
  }
}
