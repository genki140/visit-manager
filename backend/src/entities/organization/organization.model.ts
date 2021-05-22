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
  @OneToMany(() => RoledUser, (roledUser) => roledUser.organization, { cascade: true })
  roledUsers?: RoledUser[];
}

@InputType()
export class CreateOrganizationInput {
  /** 組織名 */
  @Field()
  @MaxLength(100)
  name: string = '';
}
