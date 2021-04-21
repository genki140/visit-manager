import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polygon } from './polygon.model';
import { PolygonResolver } from './polygon.resolver';
import { PolygonService } from './polygon.service';

@Module({
  imports: [TypeOrmModule.forFeature([Polygon])],
  providers: [PolygonService, PolygonResolver],
})
export class PolygonModule {}
