import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as user from 'src/drizzle/schema/userschema';
import { users } from 'src/drizzle/schema/userschema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof user>,
  ) {}

  public async findAll() {
    return await this.conn.select().from(users);
  }
  /*
  public async findUserById(id: number) {
    return await this.conn.query.users.findFirst({
      where: eq(user.id, id),
    });
  }

  public async createUser(NewUser: NewUser): Promise<User[]> {
    await this.conn.insert(user).values(NewUser);
    return this.findAll();
  }

  public async patchUser(id: number, userToEdit: NewUser): Promise<User[]> {
    return this.findAll();
  }

  public async updateUser(id: number, userToEdit: User): Promise<User[]> {
    return this.findAll();
  }

  public async deleteUser(id: number): Promise<User[]> {
    await this.conn.delete(user).where(eq(user.id, id));
    return this.findAll();
  } */
}
