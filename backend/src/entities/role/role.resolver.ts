import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/entities/role/role.model';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  // @Query(() => Role, { nullable: true })
  // async role(@Args('id', { type: () => ID }) id: number) {
  //   return await this.roleService.findOne(id);
  // }

  // @Query(() => [Role])
  // async categories() {
  //   return await this.roleService.findAll();
  // }

  // @Mutation(() => Role, { nullable: true })
  // async deleteRole(@Args('id', { type: () => ID }) id: number) {
  //   return await this.roleService.delete(id);
  // }
}
