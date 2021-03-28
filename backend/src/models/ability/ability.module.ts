import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModel } from './ability.model';
import { AbilityResolver } from './ability.resolver';
import { AbilityService } from './ability.service';

@Module({
  imports: [TypeOrmModule.forFeature([AbilityModel])],
  providers: [AbilityService, AbilityResolver],
  exports: [AbilityService],
})
export class AbilityModule {}
