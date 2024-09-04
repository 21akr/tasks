import { UserRoleEnum, UserStatusEnum } from '../../infrastructure';
import { UserSchema } from '../../database';
import { Types } from 'mongoose';
import { BaseEntityInterface } from '../../infrastructure/interfaces/base';

export class UserEntity implements BaseEntityInterface<UserEntity, UserSchema>{
  protected _id?: Types.ObjectId;
  protected _username?: string;
  protected _email?: string;
  protected _password?: string;
  protected _status?: UserStatusEnum;
  protected _userRole?: UserRoleEnum;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  buildId(id?: Types.ObjectId): UserEntity {
    this._id = id;
    return this;
  }

  buildUsername(username?: string): UserEntity {
    this._username = username;
    return this;
  }

  buildEmail(email?: string): UserEntity {
    this._email = email;
    return this;
  }

  buildPassword(password?: string): UserEntity {
    this._password = password;
    return this;
  }

  buildStatus(status?: UserStatusEnum): UserEntity {
    this._status = status;
    return this;
  }

  buildUserRole(userRole?: UserRoleEnum): UserEntity {
    this._userRole = userRole;
    return this;
  }

  buildCreatedAt(createdAt?: Date): UserEntity {
    this._createdAt = createdAt;
    return this;
  }

  buildUpdatedAt(updatedAt?: Date): UserEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  getUsername(): string {
    return <string>this._username;
  }

  getEmail(): string {
    return <string>this._email;
  }

  getPassword(): string {
    return <string>this._password;
  }

  getId(): Types.ObjectId {
    return <Types.ObjectId>this._id;
  }

  getStatus(): UserStatusEnum {
    return <UserStatusEnum>this._status;
  }

  getUserRole(): UserRoleEnum {
    return <UserRoleEnum>this._userRole;
  }

  getCreatedAt(): Date {
    return <Date>this._createdAt;
  }

  getUpdatedAt(): Date {
    return <Date>this._updatedAt;
  }

  convertToEntity(user: UserSchema): UserEntity | null {
    if(!user) return null;
    this.buildId(user._id)
      .buildUsername(user.username)
      .buildEmail(user.email)
      .buildPassword(user.password)
      .buildStatus(user.status)
      .buildCreatedAt(user.createdAt)
      .buildUpdatedAt(user.updatedAt)
      .buildUserRole(user.userRole);
    return this;
  }

  convertToSchema(): UserSchema | null {
    return {
      _id: this.getId(),
      username: this.getUsername(),
      email: this.getEmail(),
      password: this.getPassword(),
      status: this.getStatus(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      userRole: this.getUserRole(),
    };
  }
}
