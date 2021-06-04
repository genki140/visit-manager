/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organization/organization.model';
import { UserArea } from '../user-area/user-area.model';
import { Outline } from '../outline/outline.model';
import { Residence } from '../residence/residence.model';
import { MaxLength } from 'class-validator';

@ObjectType()
@Entity('areas')
@Index(['id', 'name'], { unique: true }) // 同じ組織に同名は許可しない
export class Area {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 名前 */
  @Field()
  @Column({ length: 100 })
  @Index() // 異なる組織の同名は許可するためユニークにはしない
  name: string = '';

  /** 解説 */
  @Field()
  @Column({ length: 100 })
  description: string = '';

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.roledUsers, { nullable: false })
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Column({ type: 'int', nullable: false })
  organizationId?: number;

  /** ユーザー区域 */
  @Field(() => [UserArea])
  @OneToMany(() => UserArea, (userArea) => userArea.area)
  userAreas?: UserArea[];

  /** 住宅 */
  @Field(() => [Residence])
  @OneToMany(() => Residence, (residence) => residence.area)
  residences?: Residence[];

  /** ポリゴン */
  @Field(() => [Outline])
  @OneToMany(() => Outline, (outline) => outline.area)
  outlines?: Outline[];
}

@InputType()
export class CreateAreaInput {
  @Field(() => Int)
  organizationId = 0;

  /** 区域名 */
  @Field()
  @MaxLength(100)
  name: string = '';

  /** 解説 */
  @Field()
  @MaxLength(100)
  description: string = '';
}
