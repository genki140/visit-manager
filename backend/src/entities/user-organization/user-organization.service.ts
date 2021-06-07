import { ErrorCodes } from '@/types/error-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { Organization } from '../organization/organization.model';
import { CreateUserOrganizationInput, UpdateUserOrganizationsInput, UserOrganization } from './user-organization.model';

@Injectable()
export class UserOrganizationService {
  constructor(
    @InjectRepository(UserOrganization)
    private readonly userOrganizationRepository: Repository<UserOrganization>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private connection: Connection,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<UserOrganization>) {
    if (ids == null) {
      return this.userOrganizationRepository.find(options);
    } else {
      return this.userOrganizationRepository.findByIds(ids, options);
    }
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  async create(payload: CreateUserOrganizationInput, userId: number) {
    return await this.connection.transaction(async (manager) => {
      const organizationRepository = manager.getRepository(Organization);
      const userOrganizationRepository = manager.getRepository(UserOrganization);

      const name = payload.name.trim();
      // 同名、system、index は使用できない。
      if (
        (await organizationRepository.count({
          where: { name: name },
        })) > 0 ||
        name.toUpperCase() === 'INDEX' ||
        name.toUpperCase() === 'SYSTEM'
      ) {
        throw new ApolloError('', ErrorCodes.UNUSABLE_NAME);
      }

      return await userOrganizationRepository.save({
        order: 0,
        userId: userId,
        roles: [
          {
            id: 1, // Administrator
          },
        ],
        organization: await organizationRepository.save({
          name: payload.name,
        }),
      });
    });
  }

  async update(payload: UpdateUserOrganizationsInput) {
    return await this.connection.transaction(async (manager) => {
      // const organizationRepository = manager.getRepository(Organization);
      const userOrganizationRepository = manager.getRepository(UserOrganization);
      const userOrganizations: UserOrganization[] = [];
      for (const item of payload.items) {
        userOrganizations.push(
          await userOrganizationRepository.save({
            id: item.id,
            order: item.order,
          }),
        );
      }
      return userOrganizations;
    });

    // const item = await this.userOrganizationRepository.findOneOrFail(payload.id);
    // item.order = payload.order;
    // const result = await this.userOrganizationRepository.save(item);
    // return item;
  }
}
