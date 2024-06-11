import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AccessControlModule } from 'src/token/shared/access.module';
import { TokenModule } from 'src/token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/token/guard/auth.guard';
import { AccessControlService } from 'src/token/shared/accesscontrol';
import { EventService } from 'src/event/event.service';

@Module({
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    EventService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    AccessControlService,
  ],
  imports: [DrizzleModule, TokenModule, AccessControlModule],
})
export class RegistrationModule {}
