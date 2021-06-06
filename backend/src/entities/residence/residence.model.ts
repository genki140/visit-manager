/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from '../area/area.model';
import { Resident } from '../resident/resident.model';

/** 建物。戸建てやビルの両方で使用する */
@ObjectType()
@Entity('residences')
export class Residence {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 建物名 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

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
  @JoinColumn({ name: 'areaId' })
  area?: Area;

  @Column({ type: 'int', nullable: false })
  areaId?: number;
}

@InputType()
export class CreateResidenceInput {
  /** 区域ID */
  @Field(() => Int)
  areaId: number = 0;

  /** 建物名 */
  @Field()
  @MaxLength(100)
  name: string = '';

  /** 緯度 */
  @Field()
  latitude: number = 0;

  /** 経度 */
  @Field()
  longitude: number = 0;

  // @Field()
  // @MaxLength(100)
  // userId: string = '';

  // @Field()
  // @MaxLength(100)
  // password: string = '';
}

@InputType()
export class UpdateResidenceInput {
  @Field(() => Int)
  id: number = 0;

  /** 建物名 */
  @Field()
  @MaxLength(100)
  name: string = '';

  /** 緯度 */
  @Field()
  latitude: number = 0;

  /** 経度 */
  @Field()
  longitude: number = 0;
}
