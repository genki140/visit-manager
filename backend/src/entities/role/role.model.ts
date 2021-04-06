/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ability } from '../ability/ability.model';
import { RoledUser } from '../roled-user/roled-user.model';
import { User } from '../user/user.model';

// 役割テーブル。これは組織ごとに変化せず共通とする

@ObjectType()
@Entity('roles')
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 役割名 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** ユーザー */
  @Field(() => [RoledUser])
  @ManyToMany(() => RoledUser, (roledUser) => roledUser.roles)
  roledUser?: RoledUser[];

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
