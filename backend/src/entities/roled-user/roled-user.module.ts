import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoledUser } from './roled-user.model';
import { RoledUserService } from './roled-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoledUser])],
  providers: [RoledUserService], //, OrganizationResolver],
  exports: [RoledUserService],
})
export class RoledUserModule {}
