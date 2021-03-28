import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AbilityModel } from './ability.model';
import { AbilityService } from './ability.service';

@Resolver(() => AbilityModel)
export class AbilityResolver {
  constructor(@Inject(AbilityService) private abilityService: AbilityService) {}

  @Query(() => AbilityModel, { nullable: true })
  async ability(@Args('id', { type: () => ID }) id: number) {
    return await this.abilityService.findOne(id);
  }

  @Query(() => [AbilityModel])
  async abilities() {
    return await this.abilityService.findAll();
  }

  @Mutation(() => AbilityModel, { nullable: true })
  async deleteUser(@Args('id', { type: () => ID }) id: number) {
    return await this.abilityService.delete(id);
  }
}
