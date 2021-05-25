import * as bcrypt from 'bcrypt';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Logger } from '@nestjs/common';

export type UserDocument = User & Document; // ??

@Schema({
  collection: 'usermodel',
  versionKey: false
})
export class User extends Document {
  @Prop()
  userId: number;

  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  mobile: string;

  @Prop()
  password: string;

  @Prop()
  created_at: Date;

  // profile: {
  //   isChild: boolean,
  //   name: string,
  //   gender: string,
  //   location: string,
  //   picture: string
  // };
  comparePassword: (password: string) => Promise < boolean > ;
  // async comparePassword (candidatePassword: string): Promise < boolean > {
  //   let match: boolean;

  //   try {
  //     match = await bcrypt.compare(candidatePassword, this.password);
  //   } catch (error) {
  //     return error;
  //   }

  //   if (match) {
  //     return match;
  //   }
  // }
  // gravatar: (size: number) => string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/**
* Method for comparing passwords
*/
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
  try {
    const match: boolean = await bcrypt.compare(candidatePassword, this.password);

    return match;
  } catch (error) {
    Logger.error(error);
    Logger.error(error);
    return error;
    // throw new Error('Invalid password or email');
  }
};
