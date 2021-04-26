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
    const result = await this.polygonRepository.save({
      areaId: payload.areaId,
      points: payload.points?.map((x, i) => ({
        latitude: x.latitude,
        longitude: x.longitude,
        order: i,
      })),
    });
    // console.log(result);
    const one = await this.polygonRepository.findOne(result.id, {
      relations: ['points'],
    });
    // console.log(one);
    return one;
  }

  async update(payload: UpdatePolygonInput) {
    const item = await this.polygonRepository.findOneOrFail(payload.id, {
      relations: ['points'],
    });

    // orderベースでpointsを入れ替える
    for (const payloadPoint of payload.points ?? []) {
      const findPoint = item.points?.find((x) => x.order === payloadPoint.order);
      if (findPoint != null) {
        findPoint.latitude = payloadPoint.latitude;
        findPoint.longitude = payloadPoint.longitude;
      } else {
        //新規追加
        item.points?.push({
          id: 0,
          order: payloadPoint.order,
          latitude: payloadPoint.latitude,
          longitude: payloadPoint.longitude,
        });
      }
    }

    // とりあえずテスト
    // item.points = payload.points?.map((x) => x);

    const result = await this.polygonRepository.save(item);
    return item;

    // const result = await this.polygonRepository.save({
    //   // areaId: payload.areaId,
    //   points: payload.points?.map((x, i) => ({
    //     latitude: x.latitude,
    //     longitude: x.longitude,
    //     order: i,
    //   })),
    // });
    // // console.log(result);
    // const one = await this.polygonRepository.findOne(result.id, {
    //   relations: ['points'],
    // });
    // // console.log(one);
    // return one;

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
