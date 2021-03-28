import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, UserModel } from '@/models/user/user.model';
import { UserService } from '@/models/user/user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.findOne(id);
  }

  @Query(() => [UserModel])
  async users() {
    return await this.userService.findAll();
  }

  @Mutation(() => UserModel)
  async createUser(@Args('user') user: CreateUserInput) {
    return await this.userService.create(user);
  }

  @Mutation(() => UserModel, { nullable: true })
  async deleteUser(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.delete(id);
  }
}
