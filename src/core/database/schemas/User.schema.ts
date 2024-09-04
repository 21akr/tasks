import { prop } from '@typegoose/typegoose';
import { UserRoleEnum, UserStatusEnum } from '../../infrastructure';
import { Types } from 'mongoose';

export class UserSchema {
  _id?: Types.ObjectId;

  @prop({ type: String })
  username?: string;

  @prop({ enum: UserStatusEnum, type: String })
  status?: UserStatusEnum;

  @prop({ type: String })
  email?: string;

  @prop({ type: String })
  password?: string;

  @prop({ enum: UserRoleEnum, type: String })
  userRole?: UserRoleEnum;

  @prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}