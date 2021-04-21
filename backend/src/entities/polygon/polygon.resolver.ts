import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { PolygonService } from './polygon.service';
import { CreatePolygonInput, Polygon, UpdatePolygonInput } from './polygon.model';

// export const CustomDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
//   GqlExecutionContext.create(ctx).getContext(),
// );

@Resolver(() => Polygon)
export class PolygonResolver {
  constructor(@Inject(PolygonService) private polygonService: PolygonService) {}

  @Mutation(() => Polygon)
  async createPolygon(@Args('polygon') polygon: CreatePolygonInput) {
    const result = await this.polygonService.create(polygon);
    return result;
  }

  @Mutation(() => Polygon)
  async updateResidence(@Args('polygon') polygon: UpdatePolygonInput) {
    const result = await this.polygonService.update(polygon);
    return result;
  }

  // @Mutation(() => User, { nullable: true })
  // async deleteUser(@Args('id', { type: () => ID }) id: number) {
  //   return await this.residenceService.delete(id);
  // }
}
