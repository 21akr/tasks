import { TaskEntity } from '../../../core';
import { GetTasksListResponse } from './GetTasksList.response';

export class GetTaskResponse extends GetTasksListResponse {
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(task: TaskEntity) {
    super(task);
    this.description = task.getDescription();
    this.createdAt = task.getCreatedAt();
    this.updatedAt = task.getUpdatedAt();
  }
}
