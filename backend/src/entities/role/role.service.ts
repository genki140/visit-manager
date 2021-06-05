import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  // findOne = async (id: number) => this.roleRepository.findOne(id);
  // findAll = async () => this.roleRepository.find();

  // async findByIds(ids: number[]) {
  //   return this.roleRepository.findByIds(ids);
  // }

  // async delete(id: number) {
  //   await this.roleRepository.delete(id);
  //   return await this.findOne(id);
  // }
}
