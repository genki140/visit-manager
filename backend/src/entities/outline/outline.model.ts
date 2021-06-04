/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OutlinePoint as OutlinePoint } from '../outline-point/outline-point.model';
import { Area } from '../area/area.model';

@ObjectType()
@Entity('outlines')
export class Outline {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** ポイント */
  @Field(() => [OutlinePoint])
  @OneToMany(() => OutlinePoint, (outlinePoint) => outlinePoint.outline, { cascade: true })
  points?: OutlinePoint[];

  /** 区域 */
  @Field(() => Area)
  @ManyToOne(() => Area, (area) => area.outlines, { nullable: false })
  @JoinColumn({ name: 'areaId' })
  area?: Area;

  @Column({ type: 'int', nullable: false })
  areaId?: number;
}

@InputType()
export class CreateOutlinePointInput {
  /** 緯度 */
  @Field()
  latitude: number = 0;

  /** 経度 */
  @Field()
  longitude: number = 0;
}

@InputType()
export class CreateOutlineInput {
  /** ポイント */
  @Field(() => [CreateOutlinePointInput])
  points: CreateOutlinePointInput[] = [];

  @Field(() => ID)
  areaId?: number;
}

@InputType()
export class UpdateOutlinePointInput {
  /** 点の順 */
  @Field()
  order: number = 0;

  /** 緯度 */
  @Field()
  latitude: number = 0;

  /** 経度 */
  @Field()
  longitude: number = 0;
}

@InputType()
export class UpdateOutlineInput {
  @Field(() => ID)
  id: number = 0;

  /** ポイント */
  @Field(() => [UpdateOutlinePointInput])
  points: UpdateOutlinePointInput[] = [];
}
