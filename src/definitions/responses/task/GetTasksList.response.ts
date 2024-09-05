import { Types } from 'mongoose';
import { TaskEntity, TaskStatusEnum } from '../../../core';

export class GetTasksListResponse {
  id?: Types.ObjectId;
  userId?: Types.ObjectId;
  status?: TaskStatusEnum;
  title?: string;

  constructor(task: TaskEntity) {
    this.id = task.getId();
    this.userId = task.getUserId();
    this.status = task.getStatus();
    this.title = task.getTitle();
  }
}
