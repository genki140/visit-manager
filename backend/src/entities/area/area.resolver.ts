import { CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { In } from 'typeorm';
import { AbilityTypes } from '../ability/ability.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Area, CreateAreaInput, UpdateAreaOrdersInput } from './area.model';
import { AreaService } from './area.service';

@Resolver(() => Area)
export class AreaResolver {
  constructor(@Inject(AreaService) private areaService: AreaService, private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Area])
  async areas(
    @Args('organizationId', { type: () => Int, nullable: true }) organizationId: number | null,
    @Args('ids', { type: () => [Int], nullable: true }) ids: number[] | null,
    @CurrentUser() currentUser: User,
  ) {
    // ログインユーザーが所属している組織の区域一覧を取得する。
    // 組織が指定されている場合はその組織の区域のみ取得する。
    // idsが指定されている場合は、そのidの区域のみ取得する。

    const userOrganizationIds = currentUser.userOrganizations?.map((x) => x.id) ?? [];

    // 組織の指定があるのにその組織に所属していなければ例外を返す。
    if (organizationId != null && userOrganizationIds.some((x) => x === organizationId) !== true) {
      // console.log(organizationId);
      // console.log(userOrganizationIds);
      throw new AuthenticationError('');
    }

    // idsの指定があればそれで絞り込む
    const result = await this.areaService.find(ids ?? undefined, {
      where: {
        organizationId: organizationId ?? In(userOrganizationIds), // 組織の指定があれば絞り込む
      },
      relations: [
        // 最終的にはクエリに応じて必要な部分だけ含める
        'organization',
        'residences',
        'residences.residents',
        'outlines',
        'outlines.points',
        'userAreas',
        'userAreas.user',
      ],
    });

    // if (userIds != null) {
    //   result = result.filter((x) => x.userAreas?.some((y) => userIds.some((z) => y.user?.id === z)));
    // }

    return result;
  }

  @Mutation(() => Area)
  @UseGuards(GqlAuthGuard)
  async createArea(@Args('area') area: CreateAreaInput, @CurrentUser() currentUser: User) {
    RequiredAbilities([AbilityTypes.CreateArea], currentUser, area.organizationId);

    return await this.areaService.create(area);
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  @Mutation(() => [Area])
  @UseGuards(GqlAuthGuard)
  async updateAreaOrders(@Args('areaOrders') areaOrders: UpdateAreaOrdersInput) {
    const result = await this.areaService.update(areaOrders);
    return result;
  }

  // @UseGuards(GqlAuthGuard)
  // @Query(() => [Area])
  // async areas(
  //   @Args('organizationId', { type: () => ID }) organizationId: string,
  //   // @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
  //   @CurrentUser() currentUser: User,
  // ) {
  //   // RequiredAbilities([AbilityTypes.Administrator], currentUser, organizationId);

  //   // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
  //   const relations: string[] = [];
  //   // // とりあえず
  //   // relations.push('roledUsers');
  //   // relations.push('roledUsers.roles');
  //   // relations.push('roledUsers.roles.abilities');
  //   // relations.push('roledUsers.organization');

  //   const result = await this.areaService.find(undefined, {
  //     // where: { organization: { id: 1, name: '' } },
  //     // where: {
  //     //   organization: { name: organizationId },
  //     // },
  //     // relations: relations,
  //   });
  //   // if (ids != null && result.length !== ids.length) {
  //   //   throw new Error('Some IDs were not found.');
  //   // }
  //   return result;
  // }
}
