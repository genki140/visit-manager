import { AbilityTypes, CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { In } from 'typeorm';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserArea } from './user-area.model';
import { UserAreaService } from './user-area.service';

@Resolver(() => UserArea)
export class UserAreaResolver {
  constructor(
    @Inject(UserAreaService) private userAreaService: UserAreaService,
    @Inject(UserService) private userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserArea])
  async userAreas(
    @Args('organizationId', { type: () => ID }) organizationId: string,
    // @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
    @CurrentUser() currentUser: User,
  ) {
    const users = await this.userService.find(undefined, {
      where: { id: currentUser.id },
      relations: ['userAreas', 'userAreas.area', 'userAreas.area.organization'],
    });

    return users
      .map((x) => x.userAreas)
      .flat()
      .filter(
        (
          x, // 名前かIDどちらかがヒット
        ) => x?.area?.organization?.id?.toString() === organizationId || x?.area?.organization?.name === organizationId,
      )
      .map((x) => x as UserArea);

    // // RequiredAbilities([AbilityTypes.Administrator], currentUser, organizationId);

    // // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
    // const relations: string[] = [];
    // // // とりあえず
    // relations.push('area');
    // relations.push('area.organization');
    // relations.push('user');

    // // whereに {user:{id: currentUser.id}} が指定できないので、クエリ作るのめんどいので逆方向リレーションで取得

    // // , area: { name: 'A-1' }
    // const result = await this.userAreaService.find(undefined, {
    //   relations: relations,

    // });
    // if (ids != null && result.length !== ids.length) {
    //   throw new Error('Some IDs were not found.');
    // }
    // return result;
  }
}
