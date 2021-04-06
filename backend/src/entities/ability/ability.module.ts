import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ability } from './ability.model';
import { AbilityResolver } from './ability.resolver';
import { AbilityService } from './ability.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ability])],
  providers: [AbilityService, AbilityResolver],
  exports: [AbilityService],
})
export class AbilityModule {}
