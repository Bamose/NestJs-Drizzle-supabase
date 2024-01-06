import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../../constants';
import * as member from './../drizzle/schema/memberschema';
@Injectable()
export class MemberService {
  constructor(
    @Inject(PG_CONNECTION) private dbmembers: NodePgDatabase<typeof member>,
  ) {}
  async create(createMemberDto: CreateMemberDto) {}

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
