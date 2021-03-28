import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Max, MaxLength, Min } from 'class-validator';

@ObjectType()
@Entity('users')
export class UserModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // ユーザーID
  @Field()
  @Column({ length: 100 })
  username: string;

  // パスワード
  @Field()
  @Column({ length: 100 })
  password: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(10)
  username: string;

  @Field()
  @MaxLength(10)
  password: string;
}
