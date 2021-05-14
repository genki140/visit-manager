import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(@Inject(OrganizationService) private organizationService: OrganizationService) {}

  /** ユーザー一覧を権限情報と共に取得します */
  @Query(() => [Organization])
  @UseGuards(GqlAuthGuard)
  async organizations(
    // @Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null,
    @CurrentUser() currentUser: User,
  ) {
    // 関連組織をすべて返す

    const ids = currentUser.roledUsers?.map((x) => x.organization?.id as number) ?? [];
    // const relations: string[] = [];
    const result = await this.organizationService.find(ids);
    if (ids != null && result.length !== ids.length) {
      throw new Error('Some IDs were not found.');
    }
    return result;
  }

  // 本来ここじゃないけどやっつけ実装
  @Query(() => String)
  async googleMapApiKey() {
    return process.env.GOOGLE_MAP_API_KEY?.toString() ?? '';
  }
}
