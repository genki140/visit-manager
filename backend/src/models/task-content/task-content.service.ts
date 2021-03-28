import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateTaskContentInput,
  TaskContentModel,
  UpdateTaskContentInput,
} from './task-content.model';
import { TaskService } from '@/models/task/task.service';

@Injectable()
export class TaskContentService {
  constructor(
    @InjectRepository(TaskContentModel)
    private taskContentRepository: Repository<TaskContentModel>,
    private taskService: TaskService,
  ) {}

  async findOne(id: number) {
    return this.taskContentRepository.findOne(id, { relations: ['task'] });
  }

  async findAll() {
    return this.taskContentRepository.find({ relations: ['task'] });
  }

  async create(payload: CreateTaskContentInput) {
    const task = await this.taskService.findOne(payload.taskId);
    return this.taskContentRepository.save({ ...payload, task });
  }

  async update({ id, ...params }: UpdateTaskContentInput) {
    this.taskContentRepository.update(id, { ...params });
    return await this.findOne(id);
  }

  async delete(id: number) {
    await this.taskContentRepository.delete(id);
    return this.findOne(id);
  }
}
