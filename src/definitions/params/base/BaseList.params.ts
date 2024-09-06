import * as joi from 'joi';

export class BaseListParams {
  page: number;
  size: number;
  search?: string;

  constructor(params: BaseListParams) {
    if (params) {
      this.page = params.page;
      this.size = params.size;
      this.search = params.search;
    }
  }

  async validate() {
    return await BaseSchemaParams.validateAsync(this);
  }
}

export const BaseSchemaParams = joi.object<BaseListParams>({
  search: joi.string(),
  page: joi.number().max(999999999).empty(1),
  size: joi.number().max(1000).empty(10),
});
