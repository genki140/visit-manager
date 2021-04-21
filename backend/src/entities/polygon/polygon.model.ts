/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { PolygonPoint } from '../polygon-point/polygon-point.model';
import { Area } from '../area/area.model';

@ObjectType()
@Entity('polygon')
export class Polygon {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** ポイント */
  @Field(() => [PolygonPoint])
  @OneToMany(() => PolygonPoint, (polygonPoint) => polygonPoint.polygon)
  points?: PolygonPoint[];

  /** 区域 */
  @Field(() => Area)
  @ManyToOne(() => Area, (area) => area.polygons, { nullable: false })
  @JoinColumn({ name: 'areaId' })
  area?: Area;

  @Column({ type: 'int', nullable: false })
  areaId?: number;
}

@ObjectType()
export class PolygonPointInput {
  @Field(() => ID, { nullable: true })
  id?: number = undefined;

  /** 緯度 */
  @Field()
  latitude: number = 0;

  /** 経度 */
  @Field()
  longitude: number = 0;
}

@InputType()
export class CreatePolygonInput {
  @Field(() => ID)
  areaId: number = 0;

  // /** ポイント */
  // @Field(() => [PolygonPointInput])
  // points?: PolygonPointInput[];
}

@InputType()
export class UpdatePolygonInput {
  @Field(() => ID)
  id: number = 0;

  // /** ポイント */
  // @Field(() => [PolygonPointInput])
  // points?: PolygonPointInput[];
}
