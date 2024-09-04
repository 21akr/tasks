import { UserRoleEnum, UserStatusEnum } from '../../infrastructure';
import { UserSchema } from '../../database';
import { Types } from 'mongoose';

export class UserEntity {
  protected _id?: Types.ObjectId;
  protected _username?: string;
  protected _status?: UserStatusEnum;
  protected _userRole?: UserRoleEnum;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  buildId(id?: Types.ObjectId): UserEntity {
    if (id) {
      this._id = id;
    }
    return this;
  }

  buildUsername(username?: string): UserEntity {
    if (username) {
      this._username = username;
    }
    return this;
  }

  buildStatus(status?: UserStatusEnum): UserEntity {
    if (status) {
      this._status = status;
    }
    return this;
  }

  buildUserRole(userRole?: UserRoleEnum): UserEntity {
    if (userRole) {
      this._userRole = userRole;
    }
    return this;
  }

  buildCreatedAt(createdAt?: Date): UserEntity {
    if (createdAt) {
      this._createdAt = createdAt;
    }
    return this;
  }

  buildUpdatedAt(updatedAt?: Date): UserEntity {
    if (updatedAt) {
      this._updatedAt = updatedAt;
    }
    return this;
  }

  getUsername(): string | undefined {
    return this._username;
  }

  getId(): Types.ObjectId | undefined {
    return this._id;
  }

  getStatus(): UserStatusEnum | undefined {
    return this._status;
  }

  getUserRole(): UserRoleEnum | undefined {
    return this._userRole;
  }

  getCreatedAt(): Date | undefined {
    return this._createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this._updatedAt;
  }

  convertToEntity(user: UserSchema): UserEntity | null {
    if (!user) return null;
    this.buildId(user._id)
      .buildStatus(user.status)
      .buildUsername(user.username)
      .buildCreatedAt(user.createdAt)
      .buildUpdatedAt(user.updatedAt)
      .buildUserRole(user.userRole);
    return this;
  }

  convertToSchema(): UserSchema | null {
    return {
      _id: this.getId(),
      status: this.getStatus(),
      username: this.getUsername(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      userRole: this.getUserRole(),
    };
  }
}
