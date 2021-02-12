import { Field, ID, ObjectType } from '@nestjs/graphql';
import 'reflect-metadata';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { IUser } from './user.interface';

@Entity()
@ObjectType()
export class User {
  // } implements IUser {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  kana: string;

  @PrimaryColumn()
  @Field()
  email: string;

  @Column()
  @Field()
  postcode: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  phone: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  admin: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
