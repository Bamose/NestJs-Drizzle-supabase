import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { users } from 'src/drizzle/schema/userschema';
import { UsersService } from './users.service';
import { Updateuserdto } from './userdto/updateuserdto';
import { Createuserdto } from './userdto/createuserdto';

@Controller('users')
export class usersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async finduserById(@Param('id') id) {
    return this.userService.findUserById(id);
  }

  @Delete('/:id')
  async deleteuserById(@Param('id') id) {
    return this.userService.deleteUser(id);
  }

  @Put('/:id')
  async updateuserById(@Param('id') id, @Body() user: Updateuserdto) {
    return this.userService.updateUser(id, user);
  }
  @Post()
  async createuser(@Body() user: Createuserdto) {
    return this.userService.createUser(user);
  }
}
