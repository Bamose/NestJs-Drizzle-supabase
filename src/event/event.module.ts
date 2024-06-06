import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { TokenModule } from 'src/token/token.module';
import { AccessControlModule } from 'src/token/shared/access.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/token/guard/auth.guard';
import { AccessControlService } from 'src/token/shared/accesscontrol';

@Module({
  controllers: [EventController],
  providers: [
    EventService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    EventService,
    AccessControlService,
  ],
  imports: [DrizzleModule, TokenModule, AccessControlModule],
  exports: [EventService],
})
export class EventModule {}
