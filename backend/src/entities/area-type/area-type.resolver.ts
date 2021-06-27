import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AreaType } from './area-type.model';

@Resolver(() => AreaType)
export class AreaTypeResolver {
  constructor(
    @InjectRepository(AreaType)
    private readonly areaTypeRepository: Repository<AreaType>,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [AreaType])
  async areaTypes(
    @Args('organizationId', { type: () => Int }) organizationId: number,
    @CurrentUser() currentUser: User,
  ) {
    // とりあえず対応。（いちいちこんなことしてられない！！）
    currentUser = (await this.userService.find([currentUser.id], { relations: ['userOrganizations'] }))[0];

    // 組織に所属していなければ例外を返す
    if (currentUser.userOrganizations?.some((x) => x.organizationId === organizationId) !== true) {
      throw new AuthenticationError('');
    }

    const result = await this.areaTypeRepository.find({
      where: {
        organizationId: organizationId,
      },
    });

    return result;
  }
}
