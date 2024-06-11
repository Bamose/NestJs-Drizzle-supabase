import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../../constants';
import * as events from '../drizzle/schema/eventschema';
import * as tickets from '../drizzle/schema/ticketschema';
import { eq } from 'drizzle-orm';
@Injectable()
export class EventService {
  constructor(
    @Inject(PG_CONNECTION) private dbevents: NodePgDatabase<typeof events>,
  ) {}

  async create(userid: string, createEventDto: CreateEventDto) {
    console.log(createEventDto);

    try {
      if (!createEventDto) {
        return 'error';
      }
      const [event] = await this.dbevents
        .insert(events.event)
        .values({
          eventname: createEventDto.eventname,
          description: createEventDto.description,
          time: createEventDto.time,
          summary: createEventDto.summary,
          image: createEventDto.image,
          location: createEventDto.location,
          organisedby: createEventDto.organisedby,
          active: false,
          date: createEventDto.date,
          userid: userid,
        })
        .returning({ id: events.event.id })
        .execute();
      return { eventId: event.id };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async findAllActive() {
    const data = await this.dbevents
      .select({
        id: events.event.id,
        eventname: events.event.eventname,
        description: events.event.description,
        summary: events.event.summary,
        image: events.event.image,
        time: events.event.time,
        location: events.event.location,
        organisedby: events.event.organisedby,
        active: events.event.active,
        date: events.event.date,
        userid: events.event.userid,
        tickettype: tickets.ticket.tickettype,
      })
      .from(events.event)
      .leftJoin(tickets.ticket, eq(events.event.id, tickets.ticket.eventid))
      .where(eq(events.event.active, true));

    return data;
  }
  async findAll() {
    const data = await this.dbevents
      .select({
        id: events.event.id,
        eventname: events.event.eventname,
        description: events.event.description,
        summary: events.event.summary,
        image: events.event.image,
        time: events.event.time,
        location: events.event.location,
        organisedby: events.event.organisedby,
        active: events.event.active,
        date: events.event.date,
        userid: events.event.userid,
      })
      .from(events.event);

    return data;
  }

  async findOne(id: string) {
    const [data] = await this.dbevents
      .select({
        id: events.event.id,
        eventname: events.event.eventname,
        description: events.event.description,
        summary: events.event.summary,
        image: events.event.image,
        time: events.event.time,
        location: events.event.location,
        organisedby: events.event.organisedby,
        active: events.event.active,
        date: events.event.date,
        userid: events.event.userid,
      })
      .from(events.event)
      .where(eq(events.event.id, id));

    return data;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
