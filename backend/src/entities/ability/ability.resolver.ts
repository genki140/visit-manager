import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Ability } from './ability.model';
import { AbilityService } from './ability.service';

@Resolver(() => Ability)
export class AbilityResolver {
  constructor(@Inject(AbilityService) private abilityService: AbilityService) {}

  @Query(() => Ability, { nullable: true })
  async ability(@Args('id', { type: () => ID }) id: number) {
    return await this.abilityService.findOne(id);
  }

  @Query(() => [Ability])
  async abilities() {
    return await this.abilityService.findAll();
  }

  @Mutation(() => Ability, { nullable: true })
  async deleteUser(@Args('id', { type: () => ID }) id: number) {
    return await this.abilityService.delete(id);
  }
}
