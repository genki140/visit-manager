/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { Role } from '../role/role.model';
import { User } from '../user/user.model';
import { RoledUser } from '../roled-user/roled-user.model';

@ObjectType()
@Entity('organizations')
export class Organization {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 組織名(URLに含まれるため重複できない) */
  @Field()
  @Column({ length: 100 })
  @Index({ unique: true })
  name: string = '';

  /** ユーザーとのリレーション */
  @Field(() => [RoledUser])
  @OneToMany(() => RoledUser, (roledUser) => roledUser.organization)
  roledUsers?: RoledUser[];

  // /** ユーザー */
  // @Field(() => [User])
  // @ManyToMany(() => User, (user) => user.organizations)
  // @JoinTable({
  //   name: 'organization_users',
  //   joinColumn: {
  //     name: 'organization_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // users?: User[];
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
