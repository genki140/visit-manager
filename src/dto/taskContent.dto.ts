import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddTaskContentInput {
  @Field()
  title: string;

  @Field(() => ID)
  taskId: number;
}

@InputType()
export class UpdateTaskContentInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  checked?: boolean;

  @Field({ nullable: true })
  title?: string;
}
