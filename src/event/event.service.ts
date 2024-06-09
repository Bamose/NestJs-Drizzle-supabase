import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../../constants';
import * as events from '../drizzle/schema/eventschema';
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
          eventName: createEventDto.eventName,
          description: createEventDto.description,
          time: createEventDto.time,
          location: createEventDto.location,
          organisedBy: createEventDto.organisedBy,
          active: false,
          date: createEventDto.date,
          userId: userid,
        })
        .returning({ id: events.event.id })
        .execute();
      return { eventId: event.id };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
