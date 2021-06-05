import { ErrorCodes } from '@/types/error-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { CreateOrganizationInput, Organization } from './organization.model';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private connection: Connection,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<Organization>) {
    if (ids == null) {
      return this.organizationRepository.find(options);
    } else {
      return this.organizationRepository.findByIds(ids, options);
    }
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  async create(payload: CreateOrganizationInput, userId: number) {
    // 同名、system、index は使用できない。
    if (
      (await this.organizationRepository.count({
        where: { name: payload.name.trim() },
      })) > 0 ||
      payload.name.trim().toUpperCase() === 'INDEX' ||
      payload.name.trim().toUpperCase() === 'SYSTEM'
    ) {
      throw new ApolloError('', ErrorCodes.UNUSABLE_NAME);
    }

    const result = await this.organizationRepository.save({
      name: payload.name.trim(),
      userOrganizations: [
        {
          userId: userId,
          roles: [
            {
              id: 1, // Administrator
            },
          ],
        },
      ],
    });
    return result;
  }
}
