/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { User } from '../user/user.model';
import { Organization } from '../organization/organization.model';
import { Role } from '../role/role.model';
import { UserArea } from '../user-area/user-area.model';
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
  area?: Area;
}
