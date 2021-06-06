/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Residence } from '../residence/residence.model';

@ObjectType()
@Entity('residents')
export class Resident {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 部屋名 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** フロア番号 */
  @Field()
  @Column()
  floor: number = 0;

  /** 部屋番号(横方向) */
  @Field()
  @Column()
  room: number = 0;

  /** 建物 */
  @Field(() => Residence)
  @ManyToOne(() => Residence, (residence) => residence.residents, { nullable: false })
  residence?: Residence;

  // その他拒否情報など？
}
