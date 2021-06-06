/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.model';

@ObjectType()
@Entity('abilities')
export class Ability {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  // 権限名
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** 権限リスト */
  @ManyToMany(() => Role, (role) => role.abilities)
  roles?: Role[];
}

// 権限のクラスを定義
export class AbilityType {
  constructor(public readonly id: number) {}
}

// 権限とIDのリストを定義
export const AbilityTypes = {
  // Administrator: new AbilityType(1),

  // 組織に区域を追加
  CreateArea: new AbilityType(2),
} as const;
export type AbilityTypes = typeof AbilityTypes[keyof typeof AbilityTypes];
