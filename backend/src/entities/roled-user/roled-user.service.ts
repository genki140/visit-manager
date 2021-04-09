import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { RoledUser } from './roled-user.model';

@Injectable()
export class RoledUserService {
  constructor(
    @InjectRepository(RoledUser)
    private readonly roledUserRepository: Repository<RoledUser>,
  ) {}

  async find(ids?: number[], options?: FindManyOptions<RoledUser>) {
    if (ids == null) {
      return this.roledUserRepository.find(options);
    } else {
      return this.roledUserRepository.findByIds(ids, options);
    }
  }
}
