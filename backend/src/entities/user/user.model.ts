/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { Role } from '../role/role.model';
import { Organization } from '../organization/organization.model';
import { RoledUser } from '../roled-user/roled-user.model';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  /** ユーザーID */
  @Field()
  @Column({ length: 100 })
  username: string = '';

  /** パスワード */
  @Field()
  @Column({ length: 100 })
  password: string = '';

  /** 名前 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** 役割 */
  @Field(() => [RoledUser])
  @OneToMany(() => RoledUser, (roledUser) => roledUser.user)
  roledUsers?: RoledUser[];
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
