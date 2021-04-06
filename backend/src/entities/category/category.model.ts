/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '@/entities/task/task.model';

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
}

registerEnumType(Color, { name: 'Color' });

@ObjectType()
@Entity('categories')
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field()
  @Column()
  name: string = '';

  @Field(() => Color)
  @Column({ type: 'enum', enum: Color })
  color?: Color;

  // @Field()
  // @CreateDateColumn()
  // createdAt: Date | null = null;

  // @Field()
  // @UpdateDateColumn()
  // updatedAt: Date | null = null;

  @Field(() => Task, { defaultValue: [] })
  @ManyToMany(() => Task, (task) => task.categories)
  tasks?: Task[];
}

@InputType()
export class CreateCategoryInput {
  @Field() name: string = '';
  @Field(() => Color) color?: Color;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID) id: number = 0;
  @Field() name?: string;
  @Field(() => Color) color?: Color;
}
