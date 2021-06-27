/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from '../area/area.model';
import { Organization } from '../organization/organization.model';

@ObjectType()
@Entity('area_types')
@Index(['id', 'name'], { unique: true })
export class AreaType {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false })
  order: number = 0;

  /** 名前 */
  @Field()
  @Column({ length: 100 })
  @Index()
  name: string = '';

  /** 解説 */
  @Field()
  @Column({ length: 100 })
  description: string = '';

  /** 組織 */
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.areas)
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization;

  @Field(() => Number)
  @Column({ type: 'int', nullable: false })
  organizationId?: number;

  /** 区域一覧 */
  @Field(() => [Area])
  @OneToMany(() => Area, (area) => area.areaType)
  areas?: Area[];
}
