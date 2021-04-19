import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residence as Residence } from './residence.model';

@Module({
  imports: [TypeOrmModule.forFeature([Residence])],
  providers: [],
})
export class ResidenceModule {}
