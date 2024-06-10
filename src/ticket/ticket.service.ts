import { event } from './../drizzle/schema/eventschema';
import { PG_CONNECTION } from './../../constants';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as tickets from '../drizzle/schema/ticketschema';
import * as events from '../drizzle/schema/eventschema';
import { eq } from 'drizzle-orm';
@Injectable()
export class TicketService {
  constructor(
    @Inject(PG_CONNECTION) private dbtickets: NodePgDatabase<typeof tickets>,
    @Inject(PG_CONNECTION) private dbevents: NodePgDatabase<typeof events>,
  ) {}
  async create(userid: string, createTicketDto: CreateTicketDto) {
    const tick = await this.dbtickets
      .insert(tickets.ticket)
      .values({
        userid,
        eventid: createTicketDto.eventid,
        salesenddate: createTicketDto.salesenddate,
        salesstartdate: createTicketDto.salesstartdate,
        salesendtime: createTicketDto.salesendtime,
        salesstarttime: createTicketDto.salesstarttime,
        fullname: createTicketDto.fullname,
        quantity: Number(createTicketDto.quantity),
        price: Number(createTicketDto.price),
        tickettype: createTicketDto.tickettype,
      })
      .returning({ id: tickets.ticket.id });

    await this.dbevents
      .update(events.event)
      .set({ active: true })
      .where(eq(events.event.id, createTicketDto.eventid));
    return { ticket: tick };
  }

  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
