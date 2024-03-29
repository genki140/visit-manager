import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { OutlineService } from './outline.service';
import { CreateOutlineInput, Outline, UpdateOutlineInput } from './outline.model';
import { UseGqlGuard } from '@/auth/auth.guard';

// export const CustomDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
//   GqlExecutionContext.create(ctx).getContext(),
// );

@Resolver(() => Outline)
@UseGqlGuard()
export class OutlineResolver {
  constructor(@Inject(OutlineService) private outlineService: OutlineService) {}

  @Mutation(() => Outline)
  async createOutline(@Args('outline') outline: CreateOutlineInput) {
    const result = await this.outlineService.create(outline);
    return result;
  }

  @Mutation(() => Outline)
  async updateOutline(@Args('outline') outline: UpdateOutlineInput) {
    const result = await this.outlineService.update(outline);
    return result;
  }

  @Mutation(() => Boolean)
  async deleteOutline(@Args('id', { type: () => Int }) id: number) {
    return await this.outlineService.delete(id);
  }
}
