import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaTypeService } from './area-type.service';
import { AreaTypeResolver } from './area-type.resolver';
import { AreaType } from './area-type.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AreaType]), UserModule],
  providers: [AreaTypeService, AreaTypeResolver],
  exports: [AreaTypeService],
})
export class AreaTypeModule {}
