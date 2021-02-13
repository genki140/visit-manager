import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskContentModel } from '@/models/task-content/task-content.model';
import { TaskModule } from '@/models/task/task.module';
import { TaskContentResolver } from '@/models/task-content/task-content.resolver';
import { TaskContentService } from '@/models/task-content/task-content.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskContentModel]),
    forwardRef(() => TaskModule),
  ],
  providers: [TaskContentService, TaskContentResolver],
  exports: [TaskContentService],
})
export class TaskContentModule {}
