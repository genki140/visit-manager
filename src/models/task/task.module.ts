import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModel } from '@/models/task/task.model';
import { CategoryModule } from '@/models/category/category.module';
import { TaskResolver } from '@/models/task/task.resolver';
import { TaskService } from '@/models/task/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskModel]),
    forwardRef(() => CategoryModule),
  ],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
