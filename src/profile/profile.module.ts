import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ProfileController],
  imports: [DrizzleModule],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
