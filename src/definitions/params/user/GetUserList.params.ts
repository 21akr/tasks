import joi from 'joi';
import { BaseListParams } from '../base';

export class GetUserListParams extends BaseListParams {
  search?: string;

  constructor(params) {
    super(params);
    this.search = params.search;
  }

  async validate() {
    return await GetUserListParamsSchema.validateAsync(this);
  }
}

export const GetUserListParamsSchema = joi.object<GetUserListParams>({
  search: joi.string(),
});
