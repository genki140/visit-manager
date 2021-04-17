import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polygon } from './polygon.model';

@Module({
  imports: [TypeOrmModule.forFeature([Polygon])],
  providers: [],
})
export class PolygonModule {}
