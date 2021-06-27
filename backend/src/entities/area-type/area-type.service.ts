import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { AreaType } from './area-type.model';

@Injectable()
export class AreaTypeService {
  constructor(
    @InjectRepository(AreaType)
    private readonly areaTypeRepository: Repository<AreaType>,
    private connection: Connection,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<AreaType>) {
    if (ids == null) {
      return this.areaTypeRepository.find(options);
    } else {
      return this.areaTypeRepository.findByIds(ids, options);
    }
  }
}
