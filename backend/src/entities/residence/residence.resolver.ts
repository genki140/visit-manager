import { UseGqlGuard } from '@/auth/auth.guard';
import { Inject } from '@nestjs/common';
import { Args, ID, Int, Mutation, Resolver } from '@nestjs/graphql';

import { CreateResidenceInput, Residence, UpdateResidenceInput } from './residence.model';
import { ResidenceService } from './residence.service';

@Resolver(() => Residence)
@UseGqlGuard()
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
  async deleteResidence(@Args('id', { type: () => Int }) id: number) {
    return await this.residenceService.delete(id);
  }
}
