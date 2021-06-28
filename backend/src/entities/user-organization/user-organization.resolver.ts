import { CurrentUser, UseGqlGuard } from '@/auth/auth.guard';
import { ErrorCodes } from '@/types/error-types';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { Connection, Repository } from 'typeorm';
import { Organization } from '../organization/organization.model';
import { User } from '../user/user.model';
import { CreateUserOrganizationInput, UpdateUserOrganizationsInput, UserOrganization } from './user-organization.model';

@Resolver(() => UserOrganization)
@UseGqlGuard()
export class UserOrganizationResolver {
  constructor(
    @InjectRepository(UserOrganization)
    private readonly userOrganizationRepository: Repository<UserOrganization>,
    private connection: Connection,
  ) {}

  /** ユーザー一覧を権限情報と共に取得します */
  @Query(() => [UserOrganization])
  async userOrganizations(@CurrentUser() currentUser: User) {
    // 関連組織をすべて返す
    const result = await this.userOrganizationRepository.find({
      where: { userId: currentUser.id },
      relations: ['organization'],
    });
    return result;
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  @Mutation(() => UserOrganization)
  async createUserOrganization(
    @Args('organization') organization: CreateUserOrganizationInput,
    @CurrentUser() currentUser: User,
  ) {
    return await this.connection.transaction(async (manager) => {
      const organizationRepository = manager.getRepository(Organization);
      const userOrganizationRepository = manager.getRepository(UserOrganization);

      const name = organization.name.trim();
      // 同名、system、index は使用できない。
      if (
        (await organizationRepository.count({
          where: { name: name },
        })) > 0 ||
        name.toUpperCase() === 'INDEX' ||
        name.toUpperCase() === 'SYSTEM'
      ) {
        throw new ApolloError('', ErrorCodes.UNUSABLE_NAME);
      }

      // 次のorder取得
      const nextOrder =
        ((await this.userOrganizationRepository.findOne(undefined, { order: { order: 'DESC' } }))?.order ?? 0) + 1;

      return await userOrganizationRepository.save({
        order: nextOrder,
        userId: currentUser.id,
        roles: [
          {
            id: 1, // Administrator
          },
        ],
        organization: await organizationRepository.save({
          name: organization.name,
          areaTypes: [
            {
              order: 0,
              name: organization.defaultAreaTypeName.trim(),
              description: '',
            },
          ],
        }),
      });
    });
  }

  /** 作成したユーザーを管理者とする新規組織の作成 */
  @Mutation(() => [UserOrganization])
  async updateUserOrganizations(@Args('userOrganizations') userOrganizations: UpdateUserOrganizationsInput) {
    return await this.connection.transaction(async (manager) => {
      const userOrganizationRepository = manager.getRepository(UserOrganization);
      const newUserOrganizations: UserOrganization[] = [];
      for (const item of userOrganizations.items) {
        newUserOrganizations.push(
          await userOrganizationRepository.save({
            id: item.id,
            order: item.order,
          }),
        );
      }
      return newUserOrganizations;
    });
  }
}
