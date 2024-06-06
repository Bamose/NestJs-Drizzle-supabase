import { Inject, Injectable } from '@nestjs/common';
import * as tokens from '../drizzle/schema/tokenschema';
import { PG_CONNECTION } from '../../constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as user from 'src/drizzle/schema/userschema';
import { JwtService } from '@nestjs/jwt';
import { Createuserdto } from 'src/users/userdto/createuserdto';
import { users } from 'src/drizzle/schema/userschema';

import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_CONNECTION)
    private db: NodePgDatabase<typeof tokens & typeof user>,

    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<{ authToken: string }> {
    const [existinguser] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!email) {
      throw new Error('email not provided');
    }
    if (!existinguser) {
      throw new Error('wrong username');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existinguser.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return await this.generateJwtToken(existinguser.id);
  }

  async createUser(NewUser: Createuserdto) {
    const [newUser] = await this.db
      .insert(users)
      .values({
        name: NewUser.username,
        password: NewUser.password,
        email: NewUser.email,
        role: NewUser.role,
      })
      .returning({ id: users.id })
      .execute();
    await this.generateJwtToken(newUser.id);
  }

  private async generateJwtToken(userId: string) {
    await this.db
      .update(tokens.token)
      .set({ valid: false })
      .where(eq(tokens.token.userId, userId))
      .execute();

    const expiration = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000 * 365,
    );

    const apiToken = await this.db
      .insert(tokens.token)
      .values({
        type: 'API',
        expiration,
        userId,
        valid: true,
        emailToken: '',
      })
      .returning({ id: tokens.token.id })
      .execute();

    const payload = { tokenid: apiToken[0].id, userid: userId };
    console.log(payload);

    return {
      authToken: await this.jwtService.signAsync(payload),
    };
  }
}
