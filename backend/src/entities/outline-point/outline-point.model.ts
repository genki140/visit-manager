/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Outline } from '../outline/outline.model';

@ObjectType()
@Entity('outline_points')
export class OutlinePoint {
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
  @Field(() => Outline)
  @ManyToOne(() => Outline, (outline) => outline.points, { nullable: false, onDelete: 'CASCADE' })
  outline?: Outline;
}
