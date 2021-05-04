import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolygonPoint } from '../polygon-point/polygon-point.model';
import { Polygon } from './polygon.model';
import { PolygonResolver } from './polygon.resolver';
import { PolygonService } from './polygon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Polygon, PolygonPoint])],
  providers: [PolygonService, PolygonResolver],
})
export class PolygonModule {}
