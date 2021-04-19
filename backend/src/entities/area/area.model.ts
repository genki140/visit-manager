/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organization/organization.model';
import { UserArea } from '../user-area/user-area.model';
import { Polygon } from '../polygon/polygon.model';
import { Residence } from '../residence/residence.model';

@ObjectType()
@Entity('areas')
export class Area {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 名前 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** 解説 */
  @Field()
  @Column({ length: 100 })
  description: string = '';

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.roledUsers, { nullable: false })
  organization?: Organization;

  /** ユーザー区域 */
  @Field(() => [UserArea])
  @OneToMany(() => UserArea, (userArea) => userArea.area)
  userAreas?: UserArea[];

  /** 住宅 */
  @Field(() => [Residence])
  @OneToMany(() => Residence, (residence) => residence.area)
  residences?: Residence[];

  /** ポリゴン */
  @Field(() => [Polygon])
  @OneToMany(() => Polygon, (polygon) => polygon.area)
  polygons?: Polygon[];
}
