import { event } from './../drizzle/schema/eventschema';
import { PG_CONNECTION } from './../../constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as events from '../drizzle/schema/eventschema';
import * as registers from '../drizzle/schema/registerschema';
import * as users from '../drizzle/schema/userschema';
import { eq } from 'drizzle-orm';
@Injectable()
export class RegistrationService {
  constructor(
    @Inject(PG_CONNECTION) private dbregister: NodePgDatabase<typeof registers>,
    @Inject(PG_CONNECTION) private dbevents: NodePgDatabase<typeof events>,
  ) {}
  async create(userid: string, createRegistrationDto: CreateRegistrationDto) {
    try {
      const data = await this.dbregister
        .insert(registers.register)
        .values({
          userid,
          eventid: createRegistrationDto.eventid,
          fullname: createRegistrationDto.fullname,
        })
        .returning({ id: registers.register.id });
      console.log(data);
      return 'registered';
    } catch (e) {
      return 'error';
    }
  }

  async findAll(eventid: string) {
    const data = this.dbregister
      .select({
        id: registers.register.id,
        fullname: registers.register.fullname,
        email: users.users.email,
        eventname: events.event.eventname,
        active: events.event.active,
        location: events.event.location,
        createdat: events.event.createdat,
      })
      .from(registers.register)
      .leftJoin(events.event, eq(registers.register.eventid, events.event.id))
      .leftJoin(users.users, eq(registers.register.userid, users.users.id))
      .where(eq(registers.register.eventid, eventid))
      .orderBy(registers.register.createdat);

    console.log(data);

    return data;
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
