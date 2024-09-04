import { prop } from '@typegoose/typegoose';
import { TaskStatusEnum } from '../../infrastructure';
import { Types } from 'mongoose';
import { UserSchema } from './User.schema';

export class TaskSchema {
  _id?: Types.ObjectId;

  @prop({ type: Types.ObjectId, ref: () => UserSchema })
  userId?: Types.ObjectId;

  @prop({ enum: TaskStatusEnum, type: String })
  status?: TaskStatusEnum;

  @prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}