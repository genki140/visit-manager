import { UseGqlGuard } from '@/auth/auth.guard';
import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserArea } from './user-area.model';

@Resolver(() => UserArea)
@UseGqlGuard()
export class UserAreaResolver {
  constructor(
    @InjectRepository(UserArea)
    private readonly areaRepository: Repository<UserArea>,
  ) {}
}
