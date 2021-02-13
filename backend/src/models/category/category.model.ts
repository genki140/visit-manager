import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskModel } from '@/models/task/task.model';

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
}

registerEnumType(Color, { name: 'Color' });

@ObjectType()
@Entity('categories')
export class CategoryModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Color)
  @Column({ type: 'enum', enum: Color })
  color: Color;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => TaskModel, { defaultValue: [] })
  @ManyToMany(() => TaskModel, (task) => task.categories)
  tasks: TaskModel[];
}
