/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { User } from '../user/user.model';
import { Organization } from '../organization/organization.model';
import { Role } from '../role/role.model';

@ObjectType()
@Entity('roled_users')
export class RoledUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.roledUsers, { nullable: false })
  organization?: Organization;

  /** ユーザー */
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.roledUsers, { nullable: false })
  user?: User;

  /** 役割 */
  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.roledUser)
  @JoinTable({
    name: 'roled_user_roles',
    joinColumn: {
      name: 'roled_user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];
}
