import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-errors';
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

  async create(payload: CreateOrganizationInput, userId: number) {
    // return await this.connection.transaction(async (manager) => {
    //   const polygonRepository = manager.getRepository(Organization);
    //   const polygonPointRepository = manager.getRepository(PolygonPoint);
    // }

    // throw new ApolloError('メッセージ', 'EXISTED_NAME');

    // トリムした結果、同名、system、index は使用できない。
    const result = await this.organizationRepository.save({
      name: payload.name.trim(),
      roledUsers: [
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
    // console.log(result);
    return result;

    // return await this.organizationRepository.findOne(result.id, {
    //   relations: ['residents'],
    // });

    // // 同名チェック
    // if ((await this.residenceRepository.count({ where: { username: payload.userId } })) > 0) {
    //   throw new Error('userId is already used.');
    // }
    // return await this.residenceRepository.save({ ...payload });
  }
}
