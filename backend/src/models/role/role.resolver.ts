import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RoleModel } from '@/models/role/role.model';
import { RoleService } from '@/models/role/role.service';

@Resolver(() => RoleModel)
export class RoleResolver {
  constructor(@Inject(RoleService) private roleService: RoleService) {}

  @Query(() => RoleModel, { nullable: true })
  async Role(@Args('id', { type: () => ID }) id: number) {
    return await this.roleService.findOne(id);
  }

  @Query(() => [RoleModel])
  async categories() {
    return await this.roleService.findAll();
  }

  @Mutation(() => RoleModel, { nullable: true })
  async deleteRole(@Args('id', { type: () => ID }) id: number) {
    return await this.roleService.delete(id);
  }
}
