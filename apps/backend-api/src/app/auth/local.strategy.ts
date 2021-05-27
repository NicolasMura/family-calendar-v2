import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { User } from '../users/user.schema';
import { User } from '@family-calendar-v2/models';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<User> {
    Logger.log('LocalStrategy extends PassportStrategy - validate');
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      Logger.error('validation error: no user');
      throw new UnauthorizedException();
    }
    return user;
  }
}
