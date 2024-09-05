import * as joi from 'joi';
import { TaskStatusEnum } from '../../../core';
import { Types } from 'mongoose';

export class UpdateTaskParams {
  userId: Types.ObjectId;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;

  constructor(params: UpdateTaskParams) {
    this.userId = params.userId;
    this.title = params.title;
    this.description = params.description;
    this.status = params.status;
  }

  async validate() {
    return await UpdateTaskParamsSchema.validateAsync(this);
  }
}

export const UpdateTaskParamsSchema = joi.object<UpdateTaskParams>({
  userId: joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  title: joi.string(),
  description: joi.string(),
  status: joi.string().valid(...Object.values(TaskStatusEnum)),
});
