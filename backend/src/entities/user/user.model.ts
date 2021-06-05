/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { UserOrganization } from '../user-organization/user-organization.model';
import { UserArea } from '../user-area/user-area.model';

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
  @Index({ unique: true })
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
  @Field(() => [UserOrganization])
  @OneToMany(() => UserOrganization, (userOrganization) => userOrganization.user)
  userOrganizations?: UserOrganization[];

  /** ユーザー区域
   * RoledUserに結びつけようかと思ったが、別の組織のRoledUserとも結びつけられてしまうため、Userと結びつけるのが正解。
   */
  @Field(() => [UserArea])
  @OneToMany(() => UserArea, (userArea) => userArea.user)
  userAreas?: UserArea[];
}

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(100)
  username: string = '';

  @Field()
  @MaxLength(100)
  password: string = '';

  @Field()
  @MaxLength(100)
  name: string = '';
}
