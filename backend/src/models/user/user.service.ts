import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  // @UseGuards(AuthGuard('jwt'))
  async findAll() {
    // console.log('get users');
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
