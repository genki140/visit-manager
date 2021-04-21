import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residence as Residence } from './residence.model';
import { ResidenceResolver } from './residence.resolver';
import { ResidenceService } from './residence.service';

@Module({
  imports: [TypeOrmModule.forFeature([Residence])],
  providers: [ResidenceService, ResidenceResolver],
})
export class ResidenceModule {}
