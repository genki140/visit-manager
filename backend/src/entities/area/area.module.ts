import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaService } from './area.service';
import { AreaResolver } from './area.resolver';
import { Area } from './area.model';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaService, AreaResolver],
  exports: [AreaService],
})
export class AreaModule {}
