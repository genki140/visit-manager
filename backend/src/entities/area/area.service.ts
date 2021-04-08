import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Area } from './area.model';

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
}
