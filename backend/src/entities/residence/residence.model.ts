/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from '../area/area.model';
import { Resident } from '../resident/resident.model';

/** 建物。戸建てやビルの両方で使用する */
@ObjectType()
@Entity('residences')
export class Residence {
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

  /** 住民 */
  @Field(() => [Resident])
  @OneToMany(() => Resident, (resident) => resident.residence)
  residents?: Resident[];

  /** 区域 */
  @Field(() => Area)
  @ManyToOne(() => Area, (area) => area.residences, { nullable: false })
  area?: Area;
}
