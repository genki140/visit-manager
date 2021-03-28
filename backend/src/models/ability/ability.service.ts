import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ability } from './ability.model';

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(Ability)
    private abilityRepository: Repository<Ability>,
  ) {}

  findOne = (id: number) => this.abilityRepository.findOne(id);
  findAll = () => this.abilityRepository.find();
  findByIds = (ids: number[]) => this.abilityRepository.findByIds(ids);

  async delete(id: number) {
    await this.abilityRepository.delete(id);
    return await this.findOne(id);
  }
}
