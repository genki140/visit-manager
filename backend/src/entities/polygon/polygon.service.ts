import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { PolygonPoint } from '../polygon-point/polygon-point.model';
import { CreatePolygonInput, Polygon, UpdatePolygonInput } from './polygon.model';

@Injectable()
export class PolygonService {
  constructor(
    @InjectRepository(Polygon)
    private readonly polygonRepository: Repository<Polygon>,
    // @InjectRepository(PolygonPoint)
    // private readonly polygonPointRepository: Repository<PolygonPoint>,
    private connection: Connection,
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
    return await this.connection.transaction(async (manager) => {
      const polygonRepository = manager.getRepository(Polygon);
      const polygonPointRepository = manager.getRepository(PolygonPoint);

      let item = await polygonRepository.findOneOrFail(payload.id, {
        relations: ['points'],
      });
      if (item.points == null) {
        throw new Error();
      }

      // 新たなリストで存在しないものを先に削除
      let deleted = false;
      for (const deletes of item.points
        .filter((x) => (payload.points ?? []).some((y) => y.order === x.order) === false)
        .map((x, i) => ({ x, i }))) {
        polygonPointRepository.delete(deletes.x.id);
        deleted = true;
      }

      // 削除している場合は再取得
      if (deleted) {
        item = await polygonRepository.findOneOrFail(payload.id, {
          relations: ['points'],
        });
        if (item.points == null) {
          throw new Error();
        }
      }

      for (const payloadPoint of payload.points ?? []) {
        const findPoint = item.points.find((x) => x.order === payloadPoint.order);
        if (findPoint != null) {
          // 更新
          findPoint.latitude = payloadPoint.latitude;
          findPoint.longitude = payloadPoint.longitude;
        } else {
          //新規追加
          item.points.push({
            id: 0,
            order: payloadPoint.order,
            latitude: payloadPoint.latitude,
            longitude: payloadPoint.longitude,
          });
        }
      }
      const result = await polygonRepository.save(item);

      // console.log(item);
      return item;
    });
  }

  async delete(id: number) {
    return ((await this.polygonRepository.delete(id)).affected ?? 0) > 0;
  }
}
