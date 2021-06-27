import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ability } from './ability.model';

@Resolver(() => Ability)
export class AbilityResolver {
  constructor(
    @InjectRepository(Ability)
    private abilityRepository: Repository<Ability>,
  ) {}

  // @Query(() => Ability, { nullable: true })
  // async ability(@Args('id', { type: () => ID }) id: number) {
  //   return await this.abilityService.findOne(id);
  // }

  // @Query(() => [Ability])
  // async abilities() {
  //   return await this.abilityService.findAll();
  // }

  // @Mutation(() => Ability, { nullable: true })
  // async deleteUser(@Args('id', { type: () => ID }) id: number) {
  //   return await this.abilityService.delete(id);
  // }
}
