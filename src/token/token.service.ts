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
    console.log('login successfull');
    return await this.generateJwtToken(existinguser.id);
  }

  async createUser(NewUser: Createuserdto) {
    try {
      const [newUser] = await this.db
        .insert(users)
        .values({
          userName: NewUser.userName,
          password: await bcrypt.hash(NewUser.password, 10), // Hash password
          email: NewUser.email,
          role: NewUser.role,
        })
        .returning({ id: users.id })
        .execute();
      console.log('user created');
      return await this.generateJwtToken(newUser.id);
    } catch (e) {
      console.error('Error creating user:', e);
      return 'error creating';
    }
  }

  private async generateJwtToken(userId: string) {
    try {
      await this.db
        .update(tokens.token)
        .set({ valid: false })
        .where(eq(tokens.token.userId, userId))
        .execute();

      const expiration = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000 * 365,
      );

      const [apiToken] = await this.db
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

      if (!apiToken || !apiToken.id) {
        throw new Error('Failed to generate API token');
      }

      const payload = { tokenid: apiToken.id, userid: userId };
      const authToken = await this.jwtService.signAsync(payload);

      await this.db
        .update(tokens.token)
        .set({ emailToken: authToken })
        .where(eq(tokens.token.id, apiToken.id))
        .execute();

      return { authToken };
    } catch (e) {
      console.error('Error generating JWT token:', e);
      throw new Error('Failed to generate JWT token');
    }
  }
}
