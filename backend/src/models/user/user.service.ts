import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}

  findOne = async (id: number) => this.userRepository.findOne(id);

  async findAll() {
    return this.userRepository.find();
  }

  async findByIds(ids: number[]) {
    return this.userRepository.findByIds(ids);
  }

  create = (payload: CreateUserInput) =>
    this.userRepository.save({ ...payload });
  // update = (payload: UpdateUserInput) =>
  //   this.userRepository.save({ ...payload });

  async delete(id: number) {
    await this.userRepository.delete(id);
    return await this.findOne(id);
  }
}
