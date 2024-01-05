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
import { User } from 'src/drizzle/schema/schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findUserById(@Param('id') id): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id): Promise<User[]> {
    return this.userService.deleteUser(id);
  }

  @Patch('/:id')
  async patchUserById(@Param('id') id, @Body() user: User): Promise<User[]> {
    return this.userService.patchUser(id, user);
  }

  @Put('/:id')
  async updateUserById(@Param('id') id, @Body() user: User): Promise<User[]> {
    return this.userService.updateUser(id, user);
  }
  @Post()
  async createUser(@Body() user: User): Promise<User[]> {
    return this.userService.createUser(user);
  }
}
