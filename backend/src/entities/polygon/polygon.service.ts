import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Polygon } from './polygon.model';

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

  // async create(payload: CreateResidenceInput) {
  //   const result = await this.residenceRepository.save({
  //     areaId: payload.areaId,
  //     name: payload.name,
  //     latitude: payload.latitude,
  //     longitude: payload.longitude,
  //   });

  //   return this.residenceRepository.findOne(result.id, {
  //     relations: ['residents'],
  //   });
  // }

  // async update(payload: UpdateResidenceInput) {
  //   let item = await this.residenceRepository.findOneOrFail(payload.id, {
  //     relations: ['residents'],
  //   });

  //   item.name = payload.name;
  //   item.latitude = payload.latitude;
  //   item.longitude = payload.longitude;
  //   const result = await this.residenceRepository.save(item);
  //   return item;
  // }

  // async delete(id: number) {
  //   await this.userRepository.delete(id);
  // }
}
