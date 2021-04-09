import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserArea } from './user-area.model';

@Injectable()
export class UserAreaService {
  constructor(
    @InjectRepository(UserArea)
    private readonly areaRepository: Repository<UserArea>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<UserArea>) {
    if (ids == null) {
      return this.areaRepository.find(options);
    } else {
      return this.areaRepository.findByIds(ids, options);
    }
  }
}
