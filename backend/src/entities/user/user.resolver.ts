import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from '@/entities/user/user.model';
import { UserService } from '@/entities/user/user.service';
import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  /** 現在ログインしているユーザーの情報を取得します。*/
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async currentUser(@CurrentUser() currentUser: User) {
    const user = (
      await this.userService.find([currentUser.id], {
        relations: [
          'userOrganizations',
          'userOrganizations.organization',
          'userOrganizations.roles',
          'userOrganizations.roles.abilities',
          'userOrganizations.organization.areas',
          'userOrganizations.organization.areas.areaType',
          'userAreas',
        ],
      })
    )?.[0];
    user.password = '';
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserInput) {
    return await this.userService.create(user);
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return ((await this.userService.delete(id)).affected ?? 0) > 0;
  }
}
