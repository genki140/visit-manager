import { createParamDecorator, ExecutionContext, Inject, Injectable, UseGuards } from '@nestjs/common';
import { Args, GqlExecutionContext, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from '@/models/user/user.model';
import { UserService } from '@/models/user/user.service';
import { AbilityTypes, RequiredAbilities, GqlAbilitiesGuard } from '@/auth/gql-abilities-guards';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.findOne(id);
  }

  @Query(() => [User])
  @RequiredAbilities(AbilityTypes.Administrator)
  async users() {
    await this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserInput) {
    return await this.userService.create(user);
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.delete(id);
  }
}
