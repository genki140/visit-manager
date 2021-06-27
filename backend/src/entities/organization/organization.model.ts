/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { UserOrganization } from '../user-organization/user-organization.model';
import { Area } from '../area/area.model';
import { AreaType } from '../area-type/area-type.model';

@ObjectType()
@Entity('organizations')
export class Organization {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 組織名(URLに含まれるため重複できない) */
  @Field()
  @Column({ length: 100 })
  @Index({ unique: true })
  name: string = '';

  /** 区域とのリレーション */
  @Field(() => [Area])
  @OneToMany(() => Area, (area) => area.organization)
  areas?: Area[];

  /** 区域種別とのリレーション */
  @Field(() => [AreaType])
  @OneToMany(() => AreaType, (areaType) => areaType.organization, { cascade: true })
  areaTypes?: AreaType[];

  /** ユーザーとのリレーション */
  @Field(() => [UserOrganization])
  @OneToMany(() => UserOrganization, (userOrganization) => userOrganization.organization, { cascade: true })
  userOrganizations?: UserOrganization[];
}
