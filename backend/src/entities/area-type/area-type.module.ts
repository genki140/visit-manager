import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaTypeService } from './area-type.service';
import { AreaTypeResolver } from './area-type.resolver';
import { AreaType } from './area-type.model';

@Module({
  imports: [TypeOrmModule.forFeature([AreaType])],
  providers: [AreaTypeService, AreaTypeResolver],
  exports: [AreaTypeService],
})
export class AreaTypeModule {}
