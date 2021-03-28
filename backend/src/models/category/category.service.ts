import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CategoryModel,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/models/category/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {}

  async findOne(id: number) {
    return this.categoryRepository.findOne(id, { relations: ['tasks'] });
  }

  async findAll() {
    return this.categoryRepository.find({ relations: ['tasks'] });
  }

  async findByIds(ids: number[]) {
    return this.categoryRepository.findByIds(ids);
  }

  create = (payload: CreateCategoryInput) =>
    this.categoryRepository.save({ ...payload });
  update = (payload: UpdateCategoryInput) =>
    this.categoryRepository.save({ ...payload });
  async delete(id: number) {
    await this.categoryRepository.delete(id);
    return await this.findOne(id);
  }
}
