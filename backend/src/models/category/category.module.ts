import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModel } from '@/models/category/category.model';
import { CategoryResolver } from '@/models/category/category.resolver';
import { CategoryService } from '@/models/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
