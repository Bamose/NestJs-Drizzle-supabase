import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DepartmentModule } from 'src/department/department.module';
import { DepartmentService } from 'src/department/department.service';

@Module({
  controllers: [MemberController],
  imports: [DrizzleModule, DepartmentModule],
  providers: [MemberService, DepartmentService],
  exports: [MemberService],
})
export class MemberModule {}
