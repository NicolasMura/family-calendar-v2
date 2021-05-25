import { Controller, Get, Logger, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

// Create a custom decorator using the SetMetadata decorator factory function (used for declaring routes as public)
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  // @Get()
  // getData() {
  //   return this.appService.getData();
  // }

  @Get('todos')
  getData() {
    return this.appService.getData();
  }

  @Post('todos')
  addTodo() {
    return this.appService.addTodo();
  }
}
