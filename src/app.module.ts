import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { TokenModule } from './token/token.module';
import { ProfileModule } from './profile/profile.module';
import { AccessControlModule } from './token/shared/access.module';
import { TicketModule } from './ticket/ticket.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
    AccessControlModule,
    EventModule,
    TokenModule,
    ProfileModule,
    TicketModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
