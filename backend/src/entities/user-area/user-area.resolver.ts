import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserArea } from './user-area.model';

@Resolver(() => UserArea)
export class UserAreaResolver {
  constructor(
    @InjectRepository(UserArea)
    private readonly areaRepository: Repository<UserArea>,
  ) {}

  // @UseGuards(GqlAuthGuard)
  // @Query(() => [UserArea])
  // async userAreas(
  //   @Args('organizationId', { type: () => Int }) organizationId: number,
  //   @Args('ids', { type: () => [Int], nullable: true, defaultValue: null }) ids: number[] | null,
  //   @CurrentUser() currentUser: User,
  // ) {
  //   const user = (
  //     await this.userService.find(undefined, {
  //       where: { id: currentUser.id },
  //       relations: [
  //         'userAreas',
  //         'userAreas.area',
  //         'userAreas.area.organization',
  //         'userAreas.area.residences',
  //         'userAreas.area.residences.residents',
  //         'userAreas.area.outlines',
  //         'userAreas.area.outlines.points',
  //         'userOrganizations',
  //         'userOrganizations.organization',
  //       ],
  //     })
  //   )[0];

  //   // 組織に所属していなければ例外を返す
  //   if (user == null || user.userOrganizations?.some((x) => x.organization?.id === organizationId) !== true) {
  //     throw new AuthenticationError('');
  //     // throw new ApolloError('organization id not found.', 'NOT_FOUND');
  //   }

  //   const result =
  //     user.userAreas?.filter(
  //       (x) => ids?.some((y) => y === x.area?.id) !== false && x?.area?.organization?.id === organizationId,
  //     ) ?? [];

  //   if (ids != null && result.length !== ids.length) {
  //     throw new AuthenticationError('');
  //     // throw new ApolloError('Some IDs were not found.', 'NOT_FOUND');
  //   }
  //   return result;
  // }
}
