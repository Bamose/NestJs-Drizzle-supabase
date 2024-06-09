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
  async create(userId: string, createTicketDto: CreateTicketDto) {
    await this.dbtickets
      .insert(tickets.ticket)
      .values({
        userId,
        eventId: createTicketDto.eventId,
        salesEndDate: createTicketDto.salesEndDate,
        salesStartDate: createTicketDto.salesStartDate,
        salesEndTime: createTicketDto.salesEndTime,
        salesStartTime: createTicketDto.salesStartTime,
        fullName: createTicketDto.fullName,
        quantity: Number(createTicketDto.quantity),
        price: Number(createTicketDto.price),
        ticketType: createTicketDto.ticketType,
      })
      .returning({ id: tickets.ticket.id })
      .execute();
    await this.dbevents
      .update(events.event)
      .set({ active: true })
      .where(eq(events.event.id, createTicketDto.eventId));
    return { ticket: 'success' };
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
