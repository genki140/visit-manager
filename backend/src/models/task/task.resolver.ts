import { Inject } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddTaskInput } from '@/dto/task.dto';
import { TaskModel } from '@/models/task/task.model';
import { TaskService } from '@/models/task/task.service';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query(() => TaskModel, { nullable: true })
  async task(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query(() => [TaskModel])
  async tasks(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ) {
    return await this.taskService.findAll((take = take));
  }

  @Mutation(() => TaskModel)
  async saveTask(@Args('task') task: AddTaskInput) {
    return await this.taskService.save(task);
  }

  @Mutation(() => TaskModel, { nullable: true })
  async deleteTask(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
