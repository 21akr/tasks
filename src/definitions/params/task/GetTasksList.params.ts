import * as joi from 'joi';
import { BaseListParams } from '../base';

export class GetTasksListParams extends BaseListParams {
  search?: string;

  constructor(params) {
    super(params);
    this.search = params.search;
  }

  async validate() {
    return await GetTasksListParamsSchema.validateAsync(this);
  }
}

export const GetTasksListParamsSchema = joi.object<GetTasksListParams>({
  search: joi.string(),
});
