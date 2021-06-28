import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/entities/role/role.model';
import { UseGqlGuard } from '@/auth/auth.guard';

@Resolver(() => Role)
@UseGqlGuard()
export class RoleResolver {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
}
