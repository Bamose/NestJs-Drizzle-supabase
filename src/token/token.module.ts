import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [DrizzleModule],
  exports: [TokenService],
})
export class TokenModule {}
