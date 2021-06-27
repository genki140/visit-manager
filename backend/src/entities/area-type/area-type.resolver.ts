import { CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AreaType } from './area-type.model';
import { AreaTypeService } from './area-type.service';

@Resolver(() => AreaType)
export class AreaTypeResolver {
  constructor(
    @Inject(AreaTypeService) private areaTypeService: AreaTypeService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [AreaType])
  async areaTypes(
    @Args('organizationId', { type: () => Int }) organizationId: number,
    @CurrentUser() currentUser: User,
  ) {
    // とりあえず対応。（いちいちこんなことしてられない！！）
    currentUser = (await this.userService.find([currentUser.id], { relations: ['userOrganizations'] }))[0];

    // 組織に所属していなければ例外を返す
    if (currentUser.userOrganizations?.some((x) => x.organizationId === organizationId) !== true) {
      throw new AuthenticationError('');
    }

    const result = await this.areaTypeService.find(undefined, {
      where: {
        organizationId: organizationId,
      },
    });

    return result;
  }
}
