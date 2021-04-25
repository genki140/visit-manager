/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Polygon } from '../polygon/polygon.model';

@ObjectType()
@Entity('polygon_point')
export class PolygonPoint {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 点の順 */
  @Field()
  @Column()
  order: number = 0;

  /** 緯度 */
  @Field()
  @Column('double')
  latitude: number = 0;

  /** 経度 */
  @Field()
  @Column('double')
  longitude: number = 0;

  /** ポリゴン */
  @Field(() => Polygon)
  @ManyToOne(() => Polygon, (polygon) => polygon.points, { nullable: false })
  polygon?: Polygon;
}
