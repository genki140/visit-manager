import { CurrentUser, GqlAuthGuard, RequiredAbilities } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AreaType } from './area-type.model';
import { AreaTypeService } from './area-type.service';

@Resolver(() => AreaType)
export class AreaTypeResolver {
  constructor(@Inject(AreaTypeService) private areaTypeService: AreaTypeService) {}

  // @UseGuards(GqlAuthGuard)
  // @Query(() => [AreaType])
  // async areas(
  //   @Args('organizationId', { type: () => Int }) organizationId: number,
  //   @Args('userIds', { type: () => [Int], nullable: true, defaultValue: null }) userIds: number[] | null,
  //   @Args('ids', { type: () => [Int], nullable: true, defaultValue: null }) ids: number[] | null,
  //   @CurrentUser() currentUser: User,
  // ) {
  //   // 組織に所属していなければ例外を返す
  //   if (currentUser.userOrganizations?.some((x) => x.organization?.id === organizationId) !== true) {
  //     throw new AuthenticationError('');
  //     // throw new ApolloError('organization id not found.', 'NOT_FOUND');
  //   }

  //   let result = await this.areaService.find(ids ?? undefined, {
  //     where: {
  //       organizationId: organizationId,
  //     },
  //     relations: [
  //       'organization',
  //       'residences',
  //       'residences.residents',
  //       'outlines',
  //       'outlines.points',
  //       'userAreas',
  //       'userAreas.user',
  //     ],
  //   });

  //   if (userIds != null) {
  //     result = result.filter((x) => x.userAreas?.some((y) => userIds.some((z) => y.user?.id === z)));
  //   }

  //   return result;
  // }
}
