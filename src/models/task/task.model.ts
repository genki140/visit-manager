import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CategoryModel } from '@/models/category/category.model';
import { TaskContentModel } from '@/models/task-content/task-content.model';

@ObjectType()
@Entity('tasks')
export class TaskModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [TaskContentModel], { defaultValue: [] })
  @OneToMany(() => TaskContentModel, (taskContent) => taskContent.task)
  taskContents: TaskContentModel[];

  @Field(() => [CategoryModel], { defaultValue: [] })
  @ManyToMany(() => CategoryModel, (category) => category.tasks)
  @JoinTable({
    name: 'tasks_categories',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryModel[];
}
