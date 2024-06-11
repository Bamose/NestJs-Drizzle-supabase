import { PG_CONNECTION } from './../../constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as events from '../drizzle/schema/eventschema';
import * as registers from '../drizzle/schema/registerschema';
@Injectable()
export class RegistrationService {
  constructor(
    @Inject(PG_CONNECTION) private dbregister: NodePgDatabase<typeof registers>,
    @Inject(PG_CONNECTION) private dbevents: NodePgDatabase<typeof events>,
  ) {}
  async create(userid: string, createRegistrationDto: CreateRegistrationDto) {
    await this.dbregister
      .insert(registers.register)
      .values({
        userid,
        eventid: createRegistrationDto.eventid,
        fullname: createRegistrationDto.fullname,
      })
      .returning({ id: registers.register.id });
    return 'registered';
  }

  async findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
