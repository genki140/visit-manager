import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from '@/entities/user/user.model';
import { UserService } from '@/entities/user/user.service';
import { GraphQLResolveInfo } from 'graphql';
import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';

// export const CustomDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
//   GqlExecutionContext.create(ctx).getContext(),
// );

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  /** ユーザー一覧を権限情報と共に取得します */
  @UseGuards(GqlAuthGuard)
  // @UseGuards(JwtStrategy)
  @Query(() => [User])
  // @RequiredAbilities(AbilityTypes.Administrator)
  async users(
    @Args('organizationId', { type: () => ID }) organizationId: string,
    @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
    @Info() info: GraphQLResolveInfo,
    @CurrentUser() currentUser: User,
  ) {
    // RequiredAbilities([AbilityTypes.Administrator], currentUser, organizationId);

    // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
    const relations: string[] = [];
    // const parsedInfo = parseResolveInfo(info) as any;

    console.log('currentUser');
    console.log(currentUser);

    // console.log(parsedInfo);
    // console.log(ids);

    // if (parsedInfo.fieldsByTypeName.User.role != null) {
    //   relations.push('role');
    // }
    // if (parsedInfo.fieldsByTypeName.User.role?.fieldsByTypeName.Role.abilities != null) {
    //   relations.push('role.abilities');
    // }

    // とりあえず自動で読み込む。本当は↑の条件みたいなのをちゃんと設定し、不要なリレーションは含めないべき
    relations.push('roledUsers');
    relations.push('roledUsers.roles');
    relations.push('roledUsers.roles.abilities');
    relations.push('roledUsers.organization');
    // relations.push('userAreas');
    // relations.push('userAreas.organization');

    // // 以下は理想
    // const relationsTest = GetGraphqlQueryRelations([{type:'Role',path:'role'},{type:'Ability',path:'role.Abilities'}]);

    // console.log(relations);

    const result = await this.userService.find(ids ?? undefined, { relations: relations });
    if (ids != null && result.length !== ids.length) {
      throw new Error('Some IDs were not found.');
    }
    return result;
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
