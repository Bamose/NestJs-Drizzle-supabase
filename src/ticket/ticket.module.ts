import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { APP_GUARD } from '@nestjs/core';
import { EventService } from 'src/event/event.service';
import { AccessControlService } from 'src/token/shared/accesscontrol';
import { AuthGuard } from 'src/token/guard/auth.guard';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AccessControlModule } from 'src/token/shared/access.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  controllers: [TicketController],
  providers: [
    TicketService,
    EventService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    AccessControlService,
  ],
  imports: [DrizzleModule, TokenModule, AccessControlModule],
})
export class TicketModule {}
