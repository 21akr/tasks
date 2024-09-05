import { Types } from 'mongoose';
import { UserEntity, UserStatusEnum } from '../../../core';

export class GetUsersListResponse {
  id?: Types.ObjectId;
  username?: string;
  email?: string;
  status?: UserStatusEnum;

  constructor(user: UserEntity) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.status = user.getStatus();
  }
}
