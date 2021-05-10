import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from '@/entities/user/user.model';
import { UserService } from '@/entities/user/user.service';
import { GraphQLResolveInfo } from 'graphql';
import { CurrentUser, GqlAuthGuard } from '@/auth/auth.guard';
import { CreateResidenceInput, Residence, UpdateResidenceInput } from './residence.model';
import { ResidenceService } from './residence.service';

// export const CustomDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
//   GqlExecutionContext.create(ctx).getContext(),
// );

@Resolver(() => Residence)
export class ResidenceResolver {
  constructor(@Inject(ResidenceService) private residenceService: ResidenceService) {}

  @Mutation(() => Residence)
  async createResidence(@Args('residence') residence: CreateResidenceInput) {
    const result = await this.residenceService.create(residence);
    return result;
  }

  @Mutation(() => Residence)
  async updateResidence(@Args('residence') residence: UpdateResidenceInput) {
    const result = await this.residenceService.update(residence);
    return result;
  }

  @Mutation(() => Boolean)
  async deleteResidence(@Args('id', { type: () => ID }) id: number) {
    return await this.residenceService.delete(id);
  }
}
