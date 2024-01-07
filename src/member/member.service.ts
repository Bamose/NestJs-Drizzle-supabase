import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../../constants';
import * as Member from './../drizzle/schema/memberschema';
import { member } from './../drizzle/schema/memberschema';
import * as Department from 'src/drizzle/schema/departmentschema';
import { department } from 'src/drizzle/schema/departmentschema';
import { eq } from 'drizzle-orm';
import { DepartmentService } from 'src/department/department.service';
import { event } from 'src/drizzle/schema/eventschema';
import { users } from 'src/drizzle/schema/userschema';
@Injectable()
export class MemberService {
  constructor(
    @Inject(PG_CONNECTION) private dbmembers: NodePgDatabase<typeof Member>,
    @Inject(PG_CONNECTION)
    private dbdepartment: NodePgDatabase<typeof Department>,
    private readonly departmentservice: DepartmentService,
  ) {}
  public async findAll() {
    return await this.dbmembers.select().from(member);
  }
  async create(createMemberDto: CreateMemberDto) {
    const Department = await this.dbdepartment
      .select()
      .from(department)
      .where(eq(department.name, createMemberDto.departmentName));
    console.log(Department);
    if (Department.length === 0) {
      await this.departmentservice.createdepartment(
        createMemberDto.departmentName,
      );
    }
    await this.dbmembers.insert(member).values({
      firstName: createMemberDto.firstName,
      lastName: createMemberDto.lastName,
      email: createMemberDto.email,
      departmentName: createMemberDto.departmentName,
      phoneNumber: createMemberDto.phoneNumber,
      userId: createMemberDto.userid,
    });
    return this.findAll();
  }

  async findAllmembers() {
    return await this.dbmembers.select().from(member);
  }

  async findOne(id: number) {
    return await this.dbmembers.select().from(member).where(eq(member.id, id));
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const updatemember = await this.dbmembers
      .update(member)
      .set({
        firstName: updateMemberDto.firstName,
        lastName: updateMemberDto.lastName,
        email: updateMemberDto.email,
        departmentName: updateMemberDto.departmentName,
        phoneNumber: updateMemberDto.phoneNumber,
      })
      .where(eq(member.id, id));
    return updatemember;
  }

  async remove(id: number) {
    return await this.dbmembers.delete(member).where(eq(member.id, id));
  }
}
