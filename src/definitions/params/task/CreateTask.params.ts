import * as joi from 'joi';
import { TaskStatusEnum } from '../../../core';
import { Types } from 'mongoose';

export class CreateTaskParams {
  userId: Types.ObjectId;
  title?: string;
  description?: string;
  status?: TaskStatusEnum;

  constructor(params: CreateTaskParams) {
    this.userId = params.userId;
    this.title = params.title;
    this.description = params.description;
    this.status = params.status;
  }

  async validate() {
    return await CreateTaskParamsSchema.validateAsync(this);
  }
}

export const CreateTaskParamsSchema = joi.object<CreateTaskParams>({
  userId: joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  title: joi.string().required(),
  description: joi.string(),
  status: joi.string().valid(...Object.values(TaskStatusEnum)).default(TaskStatusEnum.TODO).required(),
});
