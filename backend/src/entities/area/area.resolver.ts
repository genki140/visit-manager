import { AbilityTypes, CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Area } from './area.model';
import { AreaService } from './area.service';

@Resolver(() => Area)
export class AreaResolver {
  constructor(@Inject(AreaService) private areaService: AreaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Area])
  async areas(
    @Args('organizationId', { type: () => ID }) organizationId: string,
    @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
    @CurrentUser() currentUser: User,
  ) {
    RequiredAbilities([AbilityTypes.Administrator], currentUser, organizationId);

    // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
    const relations: string[] = [];
    // // とりあえず
    // relations.push('roledUsers');
    // relations.push('roledUsers.roles');
    // relations.push('roledUsers.roles.abilities');
    // relations.push('roledUsers.organization');

    const result = await this.areaService.find(ids ?? undefined, { relations: relations });
    if (ids != null && result.length !== ids.length) {
      throw new Error('Some IDs were not found.');
    }
    return result;
  }
}
