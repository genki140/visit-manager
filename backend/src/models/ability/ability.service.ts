import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbilityModel } from './ability.model';

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(AbilityModel)
    private abilityRepository: Repository<AbilityModel>,
  ) {}

  findOne = (id: number) => this.abilityRepository.findOne(id);
  findAll = () => this.abilityRepository.find();
  findByIds = (ids: number[]) => this.abilityRepository.findByIds(ids);

  async delete(id: number) {
    await this.abilityRepository.delete(id);
    return await this.findOne(id);
  }
}
