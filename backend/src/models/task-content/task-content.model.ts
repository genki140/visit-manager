import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskModel } from '@/models/task/task.model';

@ObjectType()
@Entity('task_contents')
export class TaskContentModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: false })
  checked: boolean;

  @Field()
  @Column()
  title: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => TaskModel)
  @ManyToOne(() => TaskModel, (task) => task.taskContents, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  task: TaskModel;
}

@InputType()
export class CreateTaskContentInput {
  @Field() title: string;
  @Field(() => ID) taskId: number;
}

@InputType()
export class UpdateTaskContentInput {
  @Field(() => ID) id: number;
  @Field({ nullable: true }) checked?: boolean;
  @Field({ nullable: true }) title?: string;
}
