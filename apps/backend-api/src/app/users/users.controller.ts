import { Controller, Get, Logger, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get('profile')
  getProfile(@Request() req) {
    // Logger.log('**************');
    // Logger.log(req.user);
    // return req.user;
    return this.usersService.getCurrentUser();
  }

  @Get('users')
  getUsers(@Request() req) {
    return this.usersService.findAll();
  }
}
