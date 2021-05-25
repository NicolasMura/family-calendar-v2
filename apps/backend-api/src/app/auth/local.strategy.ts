import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    Logger.log('LocalStrategy extends PassportStrategy - validate');
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      Logger.error('validation error: no user');
      throw new UnauthorizedException();
    }
    return user;
  }
}
