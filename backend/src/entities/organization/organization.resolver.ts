import { Inject } from '@nestjs/common';
import { Args, ID, Info, Resolver, Query } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(@Inject(OrganizationService) private organizationService: OrganizationService) {}

  /** ユーザー一覧を権限情報と共に取得します */
  @Query(() => [Organization])
  // @RequiredAbilities(AbilityTypes.Administrator)
  async organizations(@Args('ids', { type: () => [ID], nullable: true, defaultValue: null }) ids: number[] | null) {
    // クエリにリレーションオブジェクトが指定されている場合にのみリレーションを設定（もうちょっと簡略化できそう）
    const relations: string[] = [];
    const result = await this.organizationService.find(ids ?? undefined, { relations: relations });
    if (ids != null && result.length !== ids.length) {
      throw new Error('Some IDs were not found.');
    }
    return result;
  }
}
