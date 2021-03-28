import { Inject } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTaskInput, Task } from '@/models/task/task.model';
import { TaskService } from '@/models/task/task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query(() => Task, { nullable: true })
  async task(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query(() => [Task])
  async tasks(@Args('take', { type: () => Int, nullable: true }) take?: number) {
    return await this.taskService.findAll((take = take));
  }

  @Mutation(() => Task)
  async createTask(@Args('task') task: CreateTaskInput) {
    return await this.taskService.save(task);
  }

  @Mutation(() => Task, { nullable: true })
  async deleteTask(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
