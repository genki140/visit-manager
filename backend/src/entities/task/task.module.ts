import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from '@/entities/task/task.model';
import { CategoryModule } from '@/entities/category/category.module';
import { TaskResolver } from '@/entities/task/task.resolver';
import { TaskService } from '@/entities/task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => CategoryModule)],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
