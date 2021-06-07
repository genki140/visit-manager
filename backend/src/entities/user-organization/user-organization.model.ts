/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';
import { Organization } from '../organization/organization.model';
import { Role } from '../role/role.model';
import { MaxLength } from 'class-validator';

@ObjectType()
@Entity('user_organizations')
export class UserOrganization {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false })
  order: number = 0;

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.userOrganizations, { nullable: false })
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Field(() => Number)
  @Column({ type: 'int', nullable: false })
  organizationId?: number;

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

@InputType()
export class CreateUserOrganizationInput {
  /** 組織名 */
  @Field()
  @MaxLength(100)
  name: string = '';
}

@InputType()
export class UpdateUserOrganizationsInput {
  @Field(() => [UpdateUserOrganizationsInputItem])
  items: UpdateUserOrganizationsInputItem[] = [];
}

@InputType()
export class UpdateUserOrganizationsInputItem {
  @Field(() => Int)
  id: number = 0;

  /** 並び順 */
  @Field(() => Int)
  order: number = 0;
}
