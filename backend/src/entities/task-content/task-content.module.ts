import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskContent } from '@/entities/task-content/task-content.model';
import { TaskModule } from '@/entities/task/task.module';
import { TaskContentResolver } from '@/entities/task-content/task-content.resolver';
import { TaskContentService } from '@/entities/task-content/task-content.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskContent]), forwardRef(() => TaskModule)],
  providers: [TaskContentService, TaskContentResolver],
  exports: [TaskContentService],
})
export class TaskContentModule {}
