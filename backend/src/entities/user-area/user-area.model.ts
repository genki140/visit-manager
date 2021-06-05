/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';
import { Area } from '../area/area.model';

// ユーザーに区域が割り当たった際に作成される。
// 区域完了後報告がマスタに反映された後削除される？

// 奉仕者が入力した区域情報はここに紐づく

@ObjectType()
@Entity('user-areas')
export class UserArea {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** ユーザー */
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userAreas, { nullable: false })
  user?: User;

  /** 区域 */
  @Field(() => Area)
  @ManyToOne(() => Area, (area) => area.userAreas, { nullable: false })
  area?: Area;
}
