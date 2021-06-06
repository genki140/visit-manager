/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ability } from '../ability/ability.model';
import { UserOrganization as UserOrganization } from '../user-organization/user-organization.model';

// 役割テーブル。これは組織ごとに変化せず共通とする

@ObjectType()
@Entity('roles')
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 役割名 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** ユーザー */
  @Field(() => [UserOrganization])
  @ManyToMany(() => UserOrganization, (userOrganization) => userOrganization.roles)
  userOrganization?: UserOrganization[];

  /** 権限リスト */
  @Field(() => [Ability])
  @ManyToMany(() => Ability, (ability) => ability.roles)
  @JoinTable({
    name: 'role_abilities',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ability_id',
      referencedColumnName: 'id',
    },
  })
  abilities?: Ability[];
}
