import { CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbilityTypes } from '../ability/ability.model';
import { User } from '../user/user.model';
import { Area, CreateAreaInput } from './area.model';
import { AreaService } from './area.service';

@Resolver(() => Area)
export class AreaResolver {
  constructor(@Inject(AreaService) private areaService: AreaService) {}

  // @UseGuards(GqlAuthGuard)
  // @Query(() => [Area])
  // async areas(
  //   @Args('organizationId', { type: () => ID }) organizationId: string,
  //   // @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
  //   @CurrentUser() currentUser: User,
  // ) {
  //   // RequiredAbilities([AbilityTypes.Administrator], currentUser, organizationId);

  //   // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
  //   const relations: string[] = [];
  //   // // とりあえず
  //   // relations.push('roledUsers');
  //   // relations.push('roledUsers.roles');
  //   // relations.push('roledUsers.roles.abilities');
  //   // relations.push('roledUsers.organization');

  //   const result = await this.areaService.find(undefined, {
  //     // where: { organization: { id: 1, name: '' } },
  //     // where: {
  //     //   organization: { name: organizationId },
  //     // },
  //     // relations: relations,
  //   });
  //   // if (ids != null && result.length !== ids.length) {
  //   //   throw new Error('Some IDs were not found.');
  //   // }
  //   return result;
  // }

  @Mutation(() => Area)
  @UseGuards(GqlAuthGuard)
  async createArea(@Args('area') area: CreateAreaInput, @CurrentUser() currentUser: User) {
    RequiredAbilities([AbilityTypes.CreateArea], currentUser, area.organizationId);

    return await this.areaService.create(area);
  }
}
