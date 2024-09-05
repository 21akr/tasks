import { GetUsersListResponse } from './GetUsersList.response';
import { UserEntity, UserRoleEnum } from '../../../core';

export class GetUserResponse extends GetUsersListResponse {
  userRole: UserRoleEnum;

  createdAt: Date;

  updatedAt: Date;

  constructor(user: UserEntity) {
    super(user);
    this.userRole = user.getUserRole();
    this.createdAt = user.getCreatedAt();
    this.updatedAt = user.getUpdatedAt();
  }
}
