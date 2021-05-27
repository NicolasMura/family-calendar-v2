import { Body, Controller, Get, Logger, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.schema';
import { LocalAuthGuard } from './local-auth.guard';

// Create a custom decorator using the SetMetadata decorator factory function (used for declaring routes as public)
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/signup')
  async signup(@Body() user: User) {
    return this.authService.signup(user);
  }
}