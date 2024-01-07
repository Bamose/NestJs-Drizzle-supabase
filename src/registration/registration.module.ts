import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
  imports: [DrizzleModule],
  exports: [RegistrationService],
})
export class RegistrationModule {}
