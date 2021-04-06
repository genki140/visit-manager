import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Task } from '@/entities/task/task.model';

@ObjectType()
@Entity('task_contents')
export class TaskContent {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field()
  @Column({ default: false })
  checked: boolean = false;

  @Field()
  @Column()
  title: string = '';

  // @Field({ nullable: true })
  // @CreateDateColumn()
  // createdAt: Date | null = null;

  // @Field({ nullable: true })
  // @UpdateDateColumn()
  // updatedAt: Date | null = null;

  @Field(() => Task)
  @ManyToOne(() => Task, (task) => task.taskContents, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  task?: Task;
}

@InputType()
export class CreateTaskContentInput {
  @Field() title: string = '';
  @Field(() => ID) taskId: number = 0;
}

@InputType()
export class UpdateTaskContentInput {
  @Field(() => ID) id: number = 0;
  @Field({ nullable: true }) checked?: boolean;
  @Field({ nullable: true }) title?: string;
}
