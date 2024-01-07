import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [DepartmentController],
  imports: [DrizzleModule],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
