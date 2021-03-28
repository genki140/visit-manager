import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CreateTaskContentInput,
  TaskContentModel,
  UpdateTaskContentInput,
} from './task-content.model';
import { TaskContentService } from './task-content.service';

@Resolver(() => TaskContentModel)
export class TaskContentResolver {
  constructor(
    @Inject(TaskContentService) private taskContentService: TaskContentService,
  ) {}

  @Query(() => TaskContentModel, { nullable: true })
  async taskContent(@Args('id', { type: () => ID }) id: number) {
    return await this.taskContentService.findOne(id);
  }

  @Query(() => [TaskContentModel])
  async taskContents() {
    return await this.taskContentService.findAll();
  }

  @Mutation(() => TaskContentModel)
  async createTaskContent(
    @Args('taskContent') taskContent: CreateTaskContentInput,
  ) {
    return await this.taskContentService.create(taskContent);
  }

  @Mutation(() => TaskContentModel)
  async updateTaskContent(
    @Args('taskContent') taskContent: UpdateTaskContentInput,
  ) {
    return await this.taskContentService.update(taskContent);
  }

  @Mutation(() => TaskContentModel, { nullable: true })
  async deleteTaskContent(@Args('id', { type: () => ID }) id: number) {
    return await this.taskContentService.delete(id);
  }
}
