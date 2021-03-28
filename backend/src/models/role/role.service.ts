import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleModel } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleModel)
    private roleRepository: Repository<RoleModel>,
  ) {}

  findOne = async (id: number) => this.roleRepository.findOne(id);
  findAll = async () => this.roleRepository.find();

  async findByIds(ids: number[]) {
    return this.roleRepository.findByIds(ids);
  }

  async delete(id: number) {
    await this.roleRepository.delete(id);
    return await this.findOne(id);
  }
}
