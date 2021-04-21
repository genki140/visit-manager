import { Inject, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PolygonService } from './polygon.service';
import { Polygon } from './polygon.model';

// export const CustomDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
//   GqlExecutionContext.create(ctx).getContext(),
// );

@Resolver(() => Polygon)
export class PolygonResolver {
  constructor(@Inject(PolygonService) private polygonService: PolygonService) {}

  // @Mutation(() => Residence)
  // async createResidence(@Args('residence') residence: CreateResidenceInput) {
  //   const result = await this.residenceService.create(residence);
  //   console.log(result);
  //   return result;
  // }

  // @Mutation(() => Residence)
  // async updateResidence(@Args('residence') residence: UpdateResidenceInput) {
  //   const result = await this.residenceService.update(residence);
  //   console.log(result);
  //   return result;
  // }

  // @Mutation(() => User, { nullable: true })
  // async deleteUser(@Args('id', { type: () => ID }) id: number) {
  //   return await this.residenceService.delete(id);
  // }
}
