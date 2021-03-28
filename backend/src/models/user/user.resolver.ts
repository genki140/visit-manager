import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from '@/models/user/user.model';
import { UserService } from '@/models/user/user.service';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.findOne(id);
  }

  @Query(() => [User])
  async users() {
    return await this.userService.findAll();
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
