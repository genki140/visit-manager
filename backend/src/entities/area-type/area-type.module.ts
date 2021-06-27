import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaTypeResolver } from './area-type.resolver';
import { AreaType } from './area-type.model';

@Module({
  imports: [TypeOrmModule.forFeature([AreaType])],
  providers: [AreaTypeResolver],
  exports: [],
})
export class AreaTypeModule {}
