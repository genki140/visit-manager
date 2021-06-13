import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AreaType } from './area-type.model';

@Injectable()
export class AreaTypeService {
  constructor(
    @InjectRepository(AreaType)
    private readonly areaTypeRepository: Repository<AreaType>,
    private connection: Connection,
  ) {}
}
