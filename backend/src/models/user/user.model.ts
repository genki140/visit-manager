import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Max, MaxLength, Min } from 'class-validator';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** ユーザーID */
  @Field()
  @Column({ name: 'user_id', length: 100 })
  userId: string = '';

  /** パスワード */
  @Field()
  @Column({ length: 100 })
  password: string = '';
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
