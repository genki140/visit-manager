import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskInput, Task } from './task.model';

import { CategoryService } from '@/entities/category/category.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private categoryService: CategoryService,
  ) {}

  async findOne(id: number) {
    return this.taskRepository.findOne(id, {
      relations: ['taskContents', 'categories'],
    });
  }

  async findAll(take?: number) {
    return this.taskRepository.find({
      // order: { createdAt: 'ASC' },
      relations: ['taskContents', 'categories'],
      take: take,
    });
  }

  async save({ categoryIds, ...payload }: CreateTaskInput) {
    const categories = await this.categoryService.findByIds(categoryIds);
    if (categories.length < categoryIds.length) {
      throw new Error("couldn't get it all");
    }
    return await this.taskRepository.save({ ...payload, categories });
  }

  async delete(id: number) {
    await this.taskRepository.delete(id);
    return await this.findOne(id);
  }
}
