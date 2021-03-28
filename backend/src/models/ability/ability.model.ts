import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('abilities')
export class AbilityModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // 権限名
  @Field()
  @Column({ length: 100 })
  name: string;
}
