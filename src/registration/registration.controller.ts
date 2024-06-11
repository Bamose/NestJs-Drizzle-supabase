import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { User } from 'src/token/decorators/user.decorator';

@Controller('register')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @User() user: any,
  ) {
    return this.registrationService.create(user.id, createRegistrationDto);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
