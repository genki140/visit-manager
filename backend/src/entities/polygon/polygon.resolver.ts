import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';

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
  async updatePolygon(@Args('polygon') polygon: UpdatePolygonInput) {
    const result = await this.polygonService.update(polygon);
    return result;
  }

  @Mutation(() => Boolean)
  async deletePolygon(@Args('id', { type: () => ID }) id: number) {
    return await this.polygonService.delete(id);
  }
}
