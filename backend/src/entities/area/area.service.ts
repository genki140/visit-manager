import { ErrorCodes } from '@/types/error-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { Area, CreateAreaInput, UpdateAreaOrdersInput } from './area.model';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    private connection: Connection,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<Area>) {
    if (ids == null) {
      return this.areaRepository.find(options);
    } else {
      return this.areaRepository.findByIds(ids, options);
    }
  }

  async create(payload: CreateAreaInput) {
    // 同名、system、index は使用できない。
    if (
      (await this.areaRepository.count({
        where: { organizationId: payload.organizationId, name: payload.name.trim() },
      })) > 0 ||
      payload.name.trim().toUpperCase() === 'INDEX' ||
      payload.name.trim().toUpperCase() === 'SYSTEM'
    ) {
      throw new ApolloError('', ErrorCodes.UNUSABLE_NAME);
    }

    // 最大order取得
    const maxOrder =
      ((
        await this.areaRepository.findOne(undefined, {
          order: { order: 'DESC' },
        })
      )?.order ?? 0) + 1;

    const result = await this.areaRepository.save({
      organizationId: payload.organizationId,
      name: payload.name.trim(),
      order: maxOrder,
      description: payload.description.trim(),
    });
    return result;
  }

  async update(payload: UpdateAreaOrdersInput) {
    return await this.connection.transaction(async (manager) => {
      const areaRepository = manager.getRepository(Area);
      const areas: Area[] = [];
      for (const item of payload.items) {
        areas.push(
          await areaRepository.save({
            id: item.id,
            order: item.order,
          }),
        );
      }
      return areas;
    });

    // const item = await this.userOrganizationRepository.findOneOrFail(payload.id);
    // item.order = payload.order;
    // const result = await this.userOrganizationRepository.save(item);
    // return item;
  }
}
