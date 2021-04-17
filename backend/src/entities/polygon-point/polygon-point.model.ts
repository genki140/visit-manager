/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { User } from '../user/user.model';
import { Organization } from '../organization/organization.model';
import { Role } from '../role/role.model';
import { UserArea } from '../user-area/user-area.model';
import { Polygon } from '../polygon/polygon.model';

@ObjectType()
@Entity('polygon_point')
export class PolygonPoint {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

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
