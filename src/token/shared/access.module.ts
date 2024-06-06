import { Module } from '@nestjs/common';
import { AccessControlService } from './accesscontrol';

@Module({
  providers: [AccessControlService],
})
export class AccessControlModule {}
