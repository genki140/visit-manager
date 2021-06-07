import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { CreateUserOrganizationInput, UpdateUserOrganizationsInput, UserOrganization } from './user-organization.model';
import { UserOrganizationService } from './user-organization.service';

@Resolver(() => UserOrganization)
export class UserOrganizationResolver {
  constructor(@Inject(UserOrganizationService) private userOrganizationService: UserOrganizationService) {}

  /** ユーザー一覧を権限情報と共に取得します */
  @Query(() => [UserOrganization])
  @UseGuards(GqlAuthGuard)
  async userOrganizations(
    // @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
    @CurrentUser() currentUser: User,
  ) {
    // 関連組織をすべて返す

    // const ids = currentUser.userOrganizations?.map((x) => x.organization?.id as number) ?? [];

    // const relations: string[] = [];
    const result = await this.userOrganizationService.find(undefined, {
      where: { userId: currentUser.id },
      relations: ['organization'],
      // where: {
      //   organizationId: In(ids),
      // },
    });
    // if (ids != null && result.length !== ids.length) {
    //   throw new Error('Some IDs were not found.');
    // }

    return result;
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  @Mutation(() => UserOrganization)
  @UseGuards(GqlAuthGuard)
  async createUserOrganization(
    @Args('organization') organization: CreateUserOrganizationInput,
    @CurrentUser() currentUser: User,
  ) {
    const result = await this.userOrganizationService.create(organization, currentUser.id);
    return result;
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  @Mutation(() => [UserOrganization])
  @UseGuards(GqlAuthGuard)
  async updateUserOrganizations(
    @Args('userOrganizations') userOrganizations: UpdateUserOrganizationsInput,
    // @CurrentUser() currentUser: User,
  ) {
    const result = await this.userOrganizationService.update(userOrganizations);
    return result;
  }
}
