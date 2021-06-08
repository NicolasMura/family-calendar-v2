import { IUser, UserProfile } from "@family-calendar-v2/models";

export class User implements IUser {
  userId: number;
  username: string;
  email: string;
  mobile: string;
  password: string;
  isAdmin: boolean;
  created_at: Date;
  profile: UserProfile;
}
