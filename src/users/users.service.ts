import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as user from 'src/drizzle/schema/userschema';
import { users } from 'src/drizzle/schema/userschema';
import { eq } from 'drizzle-orm';
import { Createuserdto } from './userdto/createuserdto';
import { Updateuserdto } from './userdto/updateuserdto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private dbusers: NodePgDatabase<typeof user>,
  ) {}

  public async findAll() {
    return await this.dbusers.select().from(users);
  }

  public async findUserById(id: string) {
    return await this.dbusers.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  public async createUser(NewUser: Createuserdto) {
    await this.dbusers.insert(users).values({
      userName: NewUser.userName,
      password: NewUser.password,
      email: NewUser.email,
      role: NewUser.role,
    });
    return this.findAll();
  }

  public async updateUser(userid: string, userToEdit: Updateuserdto) {
    await this.dbusers
      .update(users)
      .set({
        userName: userToEdit.username,
        password: userToEdit.password,
        email: userToEdit.email,
        role: userToEdit.role,
      })
      .where(eq(users.id, userid));
    return this.findAll();
  }

  public async deleteUser(userid: string) {
    await this.dbusers.delete(users).where(eq(users.id, userid));
    return this.findAll();
  }
}
