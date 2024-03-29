/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organization/organization.model';
import { UserArea } from '../user-area/user-area.model';
import { Outline } from '../outline/outline.model';
import { Residence } from '../residence/residence.model';
import { MaxLength } from 'class-validator';
import { AreaType } from '../area-type/area-type.model';

@ObjectType()
@Entity('areas')
@Index(['id', 'name'], { unique: true }) // 同じ組織に同名は許可しない
export class Area {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false })
  order: number = 0;

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
  @ManyToOne(() => Organization, (organization) => organization.areas)
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Field(() => Number)
  @Column({ type: 'int', nullable: false })
  organizationId?: number;

  /** 種別 */
  @Field(() => AreaType)
  @ManyToOne(() => AreaType, (areaType) => areaType.areas)
  @JoinColumn({ name: 'areaTypeId' })
  areaType?: AreaType;

  @Field(() => Number)
  @Column({ type: 'int', nullable: false })
  areaTypeId?: number;

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

  @Field(() => Int)
  areaTypeId = 0;
}

@InputType()
export class UpdateAreaOrdersInput {
  @Field(() => [UpdateAreaOrdersInputItem])
  items: UpdateAreaOrdersInputItem[] = [];
}

@InputType()
export class UpdateAreaOrdersInputItem {
  @Field(() => Int)
  id: number = 0;

  /** 並び順 */
  @Field(() => Int)
  order: number = 0;
}
