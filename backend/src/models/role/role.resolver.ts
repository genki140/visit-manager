import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from '@/models/role/role.model';
import { RoleService } from '@/models/role/role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(@Inject(RoleService) private roleService: RoleService) {}

  @Query(() => Role, { nullable: true })
  async Role(@Args('id', { type: () => ID }) id: number) {
    return await this.roleService.findOne(id);
  }

  @Query(() => [Role])
  async categories() {
    return await this.roleService.findAll();
  }

  @Mutation(() => Role, { nullable: true })
  async deleteRole(@Args('id', { type: () => ID }) id: number) {
    return await this.roleService.delete(id);
  }
}
