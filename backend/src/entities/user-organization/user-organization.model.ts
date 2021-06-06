/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';
import { Organization } from '../organization/organization.model';
import { Role } from '../role/role.model';

@ObjectType()
@Entity('user_organizations')
export class UserOrganization {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.userOrganizations, { nullable: false })
  organization?: Organization;

  /** ユーザー */
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userOrganizations, { nullable: false })
  user?: User;

  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  userId?: number;

  /** 役割 */
  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.userOrganization)
  @JoinTable({
    name: 'user_organization_roles',
    joinColumn: {
      name: 'user_organization_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];
}
