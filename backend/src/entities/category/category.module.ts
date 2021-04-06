import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '@/entities/category/category.model';
import { CategoryResolver } from '@/entities/category/category.resolver';
import { CategoryService } from '@/entities/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
