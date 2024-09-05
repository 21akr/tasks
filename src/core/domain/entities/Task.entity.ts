import { BaseEntityInterface, TaskStatusEnum } from '../../infrastructure';
import { TaskSchema } from '../../database';
import { Types } from 'mongoose';

export class TaskEntity implements BaseEntityInterface<TaskEntity, TaskSchema> {
  protected _id?: Types.ObjectId;
  protected _userId?: Types.ObjectId;
  protected _title?: string;
  protected _description?: string;
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

  buildTitle(_title?: string): TaskEntity {
    this._title = _title;
    return this;
  }

  buildDescription(_description?: string): TaskEntity {
    this._description = _description;
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

  getId(): Types.ObjectId {
    return <Types.ObjectId>this._id;
  }

  getUserId(): Types.ObjectId {
    return <Types.ObjectId>this._userId;
  }

  getTitle(): string {
    return <string>this._title;
  }

  getDescription(): string {
    return <string>this._description;
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
    if (!user) return null;
    this.buildId(user._id)
      .buildUserId(user.userId)
      .buildTitle(user.title)
      .buildDescription(user.description)
      .buildStatus(user.status)
      .buildCreatedAt(user.createdAt)
      .buildUpdatedAt(user.updatedAt);
    return this;
  }

  convertToSchema(): TaskSchema | null {
    return {
      _id: this.getId(),
      userId: this.getUserId(),
      title: this.getTitle(),
      description: this.getDescription(),
      status: this.getStatus(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
