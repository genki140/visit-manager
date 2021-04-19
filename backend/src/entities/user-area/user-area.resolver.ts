import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';
import { HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserArea } from './user-area.model';
import { UserAreaService } from './user-area.service';

export class CustomError extends Error {
  constructor(public statusCode: number, e?: string) {
    super(e);
    this.name = new.target.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // https://future-architect.github.io/typescript-guide/exception.html
    // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

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
    const user = (
      await this.userService.find(undefined, {
        where: { id: currentUser.id },
        relations: [
          'userAreas',
          'userAreas.area',
          'userAreas.area.organization',
          'userAreas.area.residences',
          'userAreas.area.residences.residents',
          'roledUsers',
          'roledUsers.organization',
        ],
      })
    )[0];

    // 名前かIDどちらかがヒットする組織に所属していなければ例外を返す
    if (
      user == null ||
      user.roledUsers?.some(
        (x) => x.organization?.id?.toString() === organizationId || x.organization?.name === organizationId,
      ) !== true
    ) {
      // throw new AuthenticationError('test');
      throw new ApolloError('msg', 'NOT_FOUND');
    }

    const userAreas =
      user.userAreas?.filter(
        (
          x, // 名前かIDどちらかがヒット
        ) => x?.area?.organization?.id?.toString() === organizationId || x?.area?.organization?.name === organizationId,
      ) ?? [];

    return userAreas;

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
