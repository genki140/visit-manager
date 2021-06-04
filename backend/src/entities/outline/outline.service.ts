import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { OutlinePoint } from '../outline-point/outline-point.model';
import { CreateOutlineInput, Outline, UpdateOutlineInput } from './outline.model';

@Injectable()
export class OutlineService {
  constructor(
    @InjectRepository(Outline)
    private readonly outlineRepository: Repository<Outline>,
    private connection: Connection,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<Outline>) {
    if (ids == null) {
      return this.outlineRepository.find(options);
    } else {
      return this.outlineRepository.findByIds(ids, options);
    }
  }

  async create(payload: CreateOutlineInput) {
    const result = await this.outlineRepository.save({
      areaId: payload.areaId,
      points: payload.points?.map((x, i) => ({
        latitude: x.latitude,
        longitude: x.longitude,
        order: i,
      })),
    });
    // console.log(result);
    const one = await this.outlineRepository.findOne(result.id, {
      relations: ['points'],
    });
    // console.log(one);
    return one;
  }

  async update(payload: UpdateOutlineInput) {
    return await this.connection.transaction(async (manager) => {
      const outlineRepository = manager.getRepository(Outline);
      const outlinePointRepository = manager.getRepository(OutlinePoint);

      let item = await outlineRepository.findOneOrFail(payload.id, {
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
        outlinePointRepository.delete(deletes.x.id);
        deleted = true;
      }

      // 削除している場合は再取得
      if (deleted) {
        item = await outlineRepository.findOneOrFail(payload.id, {
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
      const result = await outlineRepository.save(item);

      // console.log(item);
      return item;
    });
  }

  async delete(id: number) {
    return ((await this.outlineRepository.delete(id)).affected ?? 0) > 0;
  }
}
