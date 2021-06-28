import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateResidenceInput, Residence, UpdateResidenceInput } from './residence.model';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(Residence)
    private readonly residenceRepository: Repository<Residence>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<Residence>) {
    if (ids == null) {
      return this.residenceRepository.find(options);
    } else {
      return this.residenceRepository.findByIds(ids, options);
    }
  }

  async create(payload: CreateResidenceInput) {
    const result = await this.residenceRepository.save({
      areaId: payload.areaId,
      name: payload.name,
      latitude: payload.latitude,
      longitude: payload.longitude,
    });

    return await this.residenceRepository.findOne(result.id, {
      relations: ['residents'],
    });
  }

  async update(payload: UpdateResidenceInput) {
    const item = await this.residenceRepository.findOneOrFail(payload.id, {
      relations: ['residents'],
    });

    item.name = payload.name;
    item.latitude = payload.latitude;
    item.longitude = payload.longitude;
    const result = await this.residenceRepository.save(item);
    return item;
  }

  async delete(id: number) {
    return ((await this.residenceRepository.delete(id)).affected ?? 0) > 0;
  }
}
