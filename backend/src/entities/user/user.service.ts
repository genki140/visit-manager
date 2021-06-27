import { ErrorCodes } from '@/types/error-types';
import { CryptUtil } from '@/utils/crypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-errors';
import { FindManyOptions, Repository } from 'typeorm';

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
