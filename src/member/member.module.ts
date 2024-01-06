import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [MemberController],
  imports: [DrizzleModule],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
