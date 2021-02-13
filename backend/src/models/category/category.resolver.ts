import { Inject } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddCategoryInput } from '@/dto/category.dto';
import { CategoryModel } from '@/models/category/category.model';
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
  async saveCategory(@Args('category') category: AddCategoryInput) {
    return await this.taskService.save(category);
  }

  @Mutation(() => CategoryModel, { nullable: true })
  async deleteCategory(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
