import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
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
    @Args('organizationId', { type: () => Int }) organizationId: number,
    @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: string[] | null,
    @CurrentUser() currentUser: User,
  ) {
    const user = (
      await this.userService.find(undefined, {
        where: { id: currentUser.id },
        relations: [
          'userAreas',
          'userAreas.area',
          'userAreas.area.organization',
          'userAreas.area.residences',
          'userAreas.area.residences.residents',
          'userAreas.area.outlines',
          'userAreas.area.outlines.points',
          'userOrganizations',
          'userOrganizations.organization',
        ],
      })
    )[0];

    // 名前かIDどちらかがヒットする組織に所属していなければ例外を返す
    if (user == null || user.userOrganizations?.some((x) => x.organization?.id === organizationId) !== true) {
      throw new ApolloError('organization id not found.', 'NOT_FOUND');
    }

    const result =
      user.userAreas?.filter(
        (
          x, // 名前かIDどちらかがヒット
        ) =>
          ids?.some((y) => y === x.area?.id.toString() || y === x.area?.name) !== false &&
          x?.area?.organization?.id === organizationId,
      ) ?? [];

    if (ids != null && result.length !== ids.length) {
      throw new ApolloError('Some IDs were not found.', 'NOT_FOUND');
    }

    return result;
  }
}
