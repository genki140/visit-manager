import { ErrorCodes } from '@/types/error-types';
import { CryptUtil } from '@/utils/crypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-errors';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';

import { CreateUserInput, User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<User>) {
    if (ids == null) {
      return this.userRepository.find(options);
    } else {
      return this.userRepository.findByIds(ids, options);
    }
  }

  // findOne = async (id: number) => this.userRepository.findOne(id);

  // async findByUsernameWithAbilities(username: string) {
  //   return this.userRepository.findOne({ where: { username }, relations: ['role', 'role.abilities'] });
  // }

  // async findAll() {
  //   return this.userRepository.find({ relations: ['role', 'role.abilities'] });
  // }

  // async findByIds(ids: number[]) {
  //   return this.userRepository.findByIds(ids);
  // }

  // async findByUserId(userId: string) {
  //   return await this.userRepository.findOne({ where: { username: userId } });
  // }

  async create(payload: CreateUserInput) {
    // 同名チェック
    if ((await this.userRepository.count({ where: { username: payload.username.trim() } })) > 0) {
      throw new ApolloError('username is already used.', ErrorCodes.UNUSABLE_NAME);
    }
    return await this.userRepository.save({
      name: payload.name.trim(),
      username: payload.username.trim(),
      password: CryptUtil.create(payload.password),
    });
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
