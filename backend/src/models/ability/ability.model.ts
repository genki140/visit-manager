import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.model';

@ObjectType()
@Entity('abilities')
export class Ability {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  // 権限名
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** 権限リスト */
  @ManyToMany(() => Role, (role) => role.abilities)
  roles?: Role[];
}
