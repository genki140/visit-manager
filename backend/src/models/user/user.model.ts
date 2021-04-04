/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Max, MaxLength, Min } from 'class-validator';
import { Role } from '../role/role.model';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** ユーザーID */
  @Field()
  @Column({ length: 100 })
  username: string = '';

  /** パスワード */
  @Field()
  @Column({ length: 100 })
  password: string = '';

  /** 役割 */
  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role?: Role;
}

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(1000)
  userId: string = '';

  @Field()
  @MaxLength(1000)
  password: string = '';
}
