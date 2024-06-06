import { PG_CONNECTION } from './../../../constants';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config as dotenvConfig } from 'dotenv';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as tokens from 'src/drizzle/schema/tokenschema';
import { token } from 'src/drizzle/schema/tokenschema';
import { users } from 'src/drizzle/schema/userschema';
import { eq } from 'drizzle-orm';
import { IS_PUBLIC_KEY } from '../setMetaData';

dotenvConfig({ path: '.env' });

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(PG_CONNECTION) private dbtoken: NodePgDatabase<typeof tokens>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const Token = this.extractTokenFromHeader(request);
    // console.log('token', Token);
    if (!Token) {
      console.log('null');
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(Token, {
        secret: process.env.JWT_SECRET || 'super secret',
      });
      console.log(payload);
      const results = await this.dbtoken
        .select()
        .from(token)
        .leftJoin(users, eq(token.userId, payload.userid))
        .where(eq(token.id, payload.tokenid))
        .execute();

      const dbresult = results[0];

      if (!dbresult) {
        throw new UnauthorizedException();
      }

      const { token: tokenData, users: userData } = dbresult;

      if (!tokenData.valid || new Date(tokenData.expiration) < new Date()) {
        throw new UnauthorizedException();
      }

      request.user = userData;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
