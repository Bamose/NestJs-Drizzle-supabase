import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './token.service';
import { Public } from './setmetadata';
import { Createuserdto } from 'src/users/userdto/createuserdto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async register(@Body() NewUser: Createuserdto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.createUser(NewUser);
      res.status(200).json(accessToken);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Post('/login')
  async login(@Body() NewUser: Createuserdto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.authenticateUser(
        NewUser.email,
        NewUser.password,
      );
      res.status(200).json(accessToken);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
