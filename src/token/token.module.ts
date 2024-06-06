import { Module } from '@nestjs/common';
import { AuthService } from './token.service';
import { AuthController } from './token.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DrizzleModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super secret',
    }),
  ],
  exports: [AuthService],
})
export class TokenModule {}
