import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    Logger.log('*********** AuthService - validateUser');
    Logger.log(email);
    Logger.log(pass);

    const user: User = await this.usersService.findUserByEmail(email);

    const isMatched: boolean = await user.comparePassword(pass);

    Logger.log(isMatched);
    if (isMatched) {
      const { password, ...result } = user;
      return result;
    } else {
      Logger.error('Bad password');
    }

    throw new HttpException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Bad password',
    }, HttpStatus.UNAUTHORIZED);
    // return null;
  }

  async login(user: User): Promise<any> {
    Logger.log('*********** AuthService - login');
    const payload = { email: user.email, username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
      status: 200,
      logged: true,
      message: 'Sign in successfull'
    };
  }

  async signup(user: User): Promise<any> {
    Logger.log('*********** AuthService - signup');
    Logger.log(user);
    const newUser: Partial<User> = await this.usersService.createUser(user);

    return newUser;
  }
}
