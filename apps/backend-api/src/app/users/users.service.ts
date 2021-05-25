import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  // private readonly users: User[] = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     email: 'john@test.com',
  //     password: 'changeme',
  //     created_at: new Date()
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     email: 'maria@test.com',
  //     password: 'guess',
  //   },
  // ];
  private currentUser: User;

  constructor(@InjectModel(User.name) private userModel : Model<UserDocument>) {}

  async getCurrentUser(): Promise<User> {
    return this.currentUser;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    // return this.users.find(user => user.email === email);
    const user: User = await this.userModel.findOne({ email: email }).exec();

    if (!user) {
      Logger.error(`User with email ${email} not found`);
      throw new NotFoundException(`User with email ${email} not found`);
    }

    this.currentUser = user;
    return user;
  }

  async findAll(): Promise<User[]> {
    // return this.users;
    return [];
  }

  async createUser(user: User): Promise<Partial<User> | undefined> {
    const newUser = new this.userModel(user);

    const existingEmail: User = await this.userModel.findOne({ email: newUser.email });

    if (existingEmail) {
      Logger.error(`This email already exists`);
      throw new ConflictException(`This email already exists`);
    }

    if (newUser.mobile) {
      const existingMobile: User = await this.userModel.findOne({ mobile: newUser.mobile });

      if (existingMobile) {
        Logger.error(`This mobile already exists`);
        throw new ConflictException(`This mobile already exists`);
      }
    }

    let savedUser: User;
    try {
      savedUser = await this.userModel.create(newUser);
    } catch (error) {
      Logger.error(error);
      // throw new BadRequestException(error);
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error
      }, HttpStatus.BAD_REQUEST);
    }

    Logger.log('savedUser:');
    Logger.log(savedUser);

    // return savedUser;
    const { password, ...result } = newUser;
    return result;
  }




  // async create(CreateAboutDTO: CreateAboutDTO): Promise<any> {
  //   const createdCat = new this.AboutModel(CreateAboutDTO);
  //   return createdCat.save();
  // }

  // async findAllBis(): Promise<any> {
  //   return await this.AboutModel.find().exec();
  // }

  // async findById(id): Promise<About> {
  // const customer = await this.AboutModel.findById(id).exec();
  //   return customer;
  // }

  // async find(req): Promise<any> {
  //   return await this.AboutModel.find(req).exec();
  // }

  // async update(id, CreateAboutDTO: CreateAboutDTO): Promise<any> {
  //   return await this.AboutModel.findByIdAndUpdate(id, CreateAboutDTO, { new: true });
  // }

  // async delete(id): Promise<any> {
  //   return await this.AboutModel.findByIdAndRemove(id);
  // }
}