import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput, User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne = async (id: number) => this.userRepository.findOne(id);

  async findOneWithAbilities(id: number) {
    return this.userRepository.findOne({ where: { id: id }, relations: ['role', 'role.abilities'] });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findByIds(ids: number[]) {
    return this.userRepository.findByIds(ids);
  }

  async findByUserId(userId: string) {
    return await this.userRepository.findOne({ where: { userId: userId } });
  }

  async create(payload: CreateUserInput) {
    // 同名チェック
    if ((await this.userRepository.count({ where: { userId: payload.userId } })) > 0) {
      throw new Error('userId is already used.');
    }
    return await this.userRepository.save({ ...payload });
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
    return await this.findOne(id);
  }
}
