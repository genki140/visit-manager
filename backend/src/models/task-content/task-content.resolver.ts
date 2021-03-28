import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTaskContentInput, TaskContent, UpdateTaskContentInput } from './task-content.model';
import { TaskContentService } from './task-content.service';

@Resolver(() => TaskContent)
export class TaskContentResolver {
  constructor(@Inject(TaskContentService) private taskContentService: TaskContentService) {}

  @Query(() => TaskContent, { nullable: true })
  async taskContent(@Args('id', { type: () => ID }) id: number) {
    return await this.taskContentService.findOne(id);
  }

  @Query(() => [TaskContent])
  async taskContents() {
    return await this.taskContentService.findAll();
  }

  @Mutation(() => TaskContent)
  async createTaskContent(@Args('taskContent') taskContent: CreateTaskContentInput) {
    return await this.taskContentService.create(taskContent);
  }

  @Mutation(() => TaskContent)
  async updateTaskContent(@Args('taskContent') taskContent: UpdateTaskContentInput) {
    return await this.taskContentService.update(taskContent);
  }

  @Mutation(() => TaskContent, { nullable: true })
  async deleteTaskContent(@Args('id', { type: () => ID }) id: number) {
    return await this.taskContentService.delete(id);
  }
}
