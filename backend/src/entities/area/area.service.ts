import { ErrorCodes } from '@/types/error-types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { FindManyOptions, Repository } from 'typeorm';
import { Area, CreateAreaInput } from './area.model';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
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

    const result = await this.areaRepository.save({
      organizationId: payload.organizationId,
      name: payload.name.trim(),
      description: payload.description.trim(),
    });
    return result;
  }
}
