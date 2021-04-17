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
@Entity('areas')
export class Area {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 名前 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.roledUsers, { nullable: false })
  organization?: Organization;

  /** ユーザー区域 */
  @Field(() => [UserArea])
  @OneToMany(() => UserArea, (userArea) => userArea.area)
  userAreas?: UserArea[];

  /** ポリゴン */
  @Field(() => [Polygon])
  @OneToMany(() => Polygon, (polygon) => polygon.area)
  polygons?: Polygon[];
}
