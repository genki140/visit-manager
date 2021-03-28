import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Category, CreateCategoryInput, UpdateCategoryInput } from '@/models/category/category.model';
import { CategoryService } from '@/models/category/category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(@Inject(CategoryService) private taskService: CategoryService) {}

  @Query(() => Category, { nullable: true })
  async category(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Query(() => [Category])
  async categories() {
    return await this.taskService.findAll();
  }

  @Mutation(() => Category)
  async createCategory(@Args('category') category: CreateCategoryInput) {
    return await this.taskService.create(category);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('category') category: UpdateCategoryInput) {
    return await this.taskService.update(category);
  }

  @Mutation(() => Category, { nullable: true })
  async deleteCategory(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
