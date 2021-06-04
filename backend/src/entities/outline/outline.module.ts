import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutlinePoint } from '../outline-point/outline-point.model';
import { Outline } from './outline.model';
import { OutlineResolver } from './outline.resolver';
import { OutlineService as OutlineService } from './outline.service';

@Module({
  imports: [TypeOrmModule.forFeature([Outline, OutlinePoint])],
  providers: [OutlineService, OutlineResolver],
})
export class OutlineModule {}
