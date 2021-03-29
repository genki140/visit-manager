import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ability } from '../ability/ability.model';
import { User } from '../user/user.model';

@ObjectType()
@Entity('roles')
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  /** 役割名 */
  @Field()
  @Column({ length: 100 })
  name: string = '';

  /** 所属ユーザー */
  @OneToMany(() => User, (user) => user.role)
  users?: User[];

  /** 権限リスト */
  @ManyToMany(() => Ability, (ability) => ability.roles)
  @JoinTable({
    name: 'role_abilities',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ability_id',
      referencedColumnName: 'id',
    },
  })
  // @JoinTable({
  //   name: 'junction',
  //   joinColumn: {
  //     name: 'entity_a_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'entity_b_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  abilities?: Ability[];
}
