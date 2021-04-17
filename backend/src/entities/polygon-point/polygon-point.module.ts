import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolygonPoint } from './polygon-point.model';

@Module({
  imports: [TypeOrmModule.forFeature([PolygonPoint])],
  providers: [],
})
export class PolygonPointModule {}
