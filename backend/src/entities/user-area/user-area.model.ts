/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';
import { Area } from '../area/area.model';

// ユーザーに区域が割り当たった際に作成される。
// 区域完了後報告がマスタに反映された後削除される？

// 奉仕者が入力した区域情報はここに紐づく

@ObjectType()
@Entity('user-areas')
export class UserArea {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** ユーザー */
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userAreas, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Field(() => Number)
  @Column({ type: 'int', nullable: false })
  userId?: number;

  /** 区域 */
  @Field(() => Area)
  @ManyToOne(() => Area, (area) => area.userAreas, { nullable: false })
  @JoinColumn({ name: 'areaId' })
  area?: Area;

  @Field(() => Number)
  @Column({ type: 'int', nullable: false })
  areaId?: number;
}
