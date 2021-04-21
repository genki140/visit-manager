import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePolygonInput, Polygon, UpdatePolygonInput } from './polygon.model';

@Injectable()
export class PolygonService {
  constructor(
    @InjectRepository(Polygon)
    private readonly polygonRepository: Repository<Polygon>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<Polygon>) {
    if (ids == null) {
      return this.polygonRepository.find(options);
    } else {
      return this.polygonRepository.findByIds(ids, options);
    }
  }

  async create(payload: CreatePolygonInput) {
    // const result = await this.polygonRepository.save({
    //   areaId: payload.areaId,
    //   points: payload.points,
    // });
    // return this.polygonRepository.findOne(result.id, {
    //   relations: ['points'],
    // });
  }

  async update(payload: UpdatePolygonInput) {
    // const item = await this.polygonRepository.findOneOrFail(payload.id, {
    //   relations: ['points'],
    // });
    // item.points = payload.points;
    // const result = await this.polygonRepository.save(item);
    // return item;
  }

  // async delete(id: number) {
  //   await this.userRepository.delete(id);
  // }
}
