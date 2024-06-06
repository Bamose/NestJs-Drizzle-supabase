// accesscontrol.module.ts
import { Module } from '@nestjs/common';
import { AccessControlService } from './accesscontrol'; // Corrected the service name

@Module({
  providers: [AccessControlService],
})
export class AccessControlModule {} // Corrected the module name
