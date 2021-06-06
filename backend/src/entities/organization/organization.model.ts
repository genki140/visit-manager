/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { UserOrganization } from '../user-organization/user-organization.model';

@ObjectType()
@Entity('organizations')
export class Organization {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 組織名(URLに含まれるため重複できない) */
  @Field()
  @Column({ length: 100 })
  @Index({ unique: true })
  name: string = '';

  /** ユーザーとのリレーション */
  @Field(() => [UserOrganization])
  @OneToMany(() => UserOrganization, (userOrganization) => userOrganization.organization, { cascade: true })
  userOrganizations?: UserOrganization[];
}

@InputType()
export class CreateOrganizationInput {
  /** 組織名 */
  @Field()
  @MaxLength(100)
  name: string = '';
}
