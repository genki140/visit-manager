import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ability } from './ability.model';
import { AbilityResolver } from './ability.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Ability])],
  providers: [AbilityResolver],
  exports: [],
})
export class AbilityModule {}
