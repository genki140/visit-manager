import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
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

import { Category } from '@/models/category/category.model';
import { TaskContent } from '@/models/task-content/task-content.model';

@ObjectType()
@Entity('tasks')
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [TaskContent], { defaultValue: [] })
  @OneToMany(() => TaskContent, (taskContent) => taskContent.task)
  taskContents: TaskContent[];

  @Field(() => [Category], { defaultValue: [] })
  @ManyToMany(() => Category, (category) => category.tasks)
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
  categories: Category[];
}

@InputType()
export class CreateTaskInput {
  @Field() title: string;
  @Field(() => [ID]) categoryIds: number[];
}
