import { AbilityTypes, CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { In } from 'typeorm';
import { User } from '../user/user.model';
import { UserArea } from './user-area.model';
import { UserAreaService } from './user-area.service';

@Resolver(() => UserArea)
export class UserAreaResolver {
  constructor(@Inject(UserAreaService) private userAreaService: UserAreaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserArea])
  async userAreas(
    @Args('organizationId', { type: () => ID }) organizationId: string,
    // @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
    @CurrentUser() currentUser: User,
  ) {
    // RequiredAbilities([AbilityTypes.Administrator], currentUser, organizationId);

    // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
    const relations: string[] = [];
    // // とりあえず
    relations.push('area');
    relations.push('area.organization');
    relations.push('user');

    // , area: { name: 'A-1' }
    const result = await this.userAreaService.find(undefined, {
      relations: relations,
    });
    // if (ids != null && result.length !== ids.length) {
    //   throw new Error('Some IDs were not found.');
    // }
    return result;
  }
}
