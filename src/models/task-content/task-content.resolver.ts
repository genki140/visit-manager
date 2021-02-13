import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AddTaskContentInput,
  UpdateTaskContentInput,
} from '@/dto/taskContent.dto';
import { TaskContentModel } from '@/models/task-content/task-content.model';
import { TaskContentService } from '@/models/task-content/task-content.service';

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
  async saveTaskContent(@Args('taskContent') taskContent: AddTaskContentInput) {
    return await this.taskContentService.save(taskContent);
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
