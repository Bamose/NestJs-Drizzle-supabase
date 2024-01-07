import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../../constants';
import * as Department from 'src/drizzle/schema/departmentschema';
import { department } from 'src/drizzle/schema/departmentschema';
Injectable();
export class DepartmentService {
  constructor(
    @Inject(PG_CONNECTION)
    private dbdepartment: NodePgDatabase<typeof Department>,
  ) {}
  public async findAll() {
    return await this.dbdepartment.select().from(department);
  }
  async createdepartment(name: string) {
    await this.dbdepartment.insert(department).values({
      name: name,
    });
    return this.findAll();
  }
}
