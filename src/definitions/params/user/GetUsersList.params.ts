import * as joi from 'joi';
import { BaseListParams } from '../base';

export class GetUsersListParams extends BaseListParams {
  search?: string;

  constructor(params) {
    super(params);
    this.search = params.search;
  }

  async validate() {
    return await GetUserListParamsSchema.validateAsync(this);
  }
}

export const GetUserListParamsSchema = joi.object<GetUsersListParams>({
  search: joi.string(),
});
