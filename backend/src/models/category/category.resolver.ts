import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CategoryModel,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/models/category/category.model';
import { CategoryService } from '@/models/category/category.service';

@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(@Inject(CategoryService) private taskService: CategoryService) {}

  @Query(() => CategoryModel, { nullable: true })
  async category(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query(() => [CategoryModel])
  async categories() {
    return await this.taskService.findAll();
  }

  @Mutation(() => CategoryModel)
  async createCategory(@Args('category') category: CreateCategoryInput) {
    return await this.taskService.create(category);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(@Args('category') category: UpdateCategoryInput) {
    return await this.taskService.update(category);
  }

  @Mutation(() => CategoryModel, { nullable: true })
  async deleteCategory(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
