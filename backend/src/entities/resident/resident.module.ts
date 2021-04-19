import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident } from './resident.model';

@Module({
  imports: [TypeOrmModule.forFeature([Resident])],
  providers: [],
})
export class ResidentModule {}
