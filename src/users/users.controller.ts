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

@Controller('users')
export class usersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  /*   @Get('/:id')
  async finduserById(@Param('id') id): Promise<user> {
    return this.userService.finduserById(id);
  }

  @Delete('/:id')
  async deleteuserById(@Param('id') id): Promise<user[]> {
    return this.userService.deleteuser(id);
  }

  @Patch('/:id')
  async patchuserById(@Param('id') id, @Body() user: user): Promise<user[]> {
    return this.userService.patchuser(id, user);
  }

  @Put('/:id')
  async updateuserById(@Param('id') id, @Body() user: user): Promise<user[]> {
    return this.userService.updateuser(id, user);
  }
  @Post()
  async createuser(@Body() user: user): Promise<user[]> {
    return this.userService.createuser(user);
  } */
}
