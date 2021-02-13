import { Field, ID, InputType } from '@nestjs/graphql';

import { Color } from '@/models/category/category.model';

@InputType()
export class AddCategoryInput {
  @Field()
  name: string;

  @Field(() => Color)
  color: Color;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  id: number;

  @Field()
  name?: string;

  @Field(() => Color)
  color?: Color;
}
