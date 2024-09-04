import { TaskStatusEnum } from '../../infrastructure';
import { TaskSchema } from '../../database';
import { Types } from 'mongoose';
import { BaseEntityInterface } from '../../infrastructure/interfaces/base';

export class TaskEntity implements BaseEntityInterface<TaskEntity, TaskSchema> {
  protected _id?: Types.ObjectId;
  protected _userId?: Types.ObjectId;
  protected _status?: TaskStatusEnum;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  buildId(id?: Types.ObjectId): TaskEntity {
    this._id = id;
    return this;
  }

  buildUserId(_userId?: Types.ObjectId): TaskEntity {
    this._userId = _userId;
    return this;
  }

  buildStatus(status?: TaskStatusEnum): TaskEntity {
    this._status = status;
    return this;
  }

  buildCreatedAt(createdAt?: Date): TaskEntity {
    this._createdAt = createdAt;
    return this;
  }

  buildUpdatedAt(updatedAt?: Date): TaskEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  getUserId(): Types.ObjectId {
    return <Types.ObjectId>this._userId;
  }

  getId(): Types.ObjectId {
    return <Types.ObjectId>this._id;
  }

  getStatus(): TaskStatusEnum {
    return <TaskStatusEnum>this._status;
  }

  getCreatedAt(): Date {
    return <Date>this._createdAt;
  }

  getUpdatedAt(): Date {
    return <Date>this._updatedAt;
  }

  convertToEntity(user: TaskSchema): TaskEntity | null {
    if(!user) return null;
    this.buildId(user._id)
      .buildUserId(user.userId)
      .buildStatus(user.status)
      .buildCreatedAt(user.createdAt)
      .buildUpdatedAt(user.updatedAt);
    return this;
  }

  convertToSchema(): TaskSchema | null {
    return {
      _id: this.getId(),
      userId: this.getUserId(),
      status: this.getStatus(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
