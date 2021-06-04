import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutlinePoint } from './outline-point.model';

@Module({
  imports: [TypeOrmModule.forFeature([OutlinePoint])],
  providers: [],
})
export class OutlinePointModule {}
