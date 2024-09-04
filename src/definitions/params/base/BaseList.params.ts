import * as joi from 'joi';

export class BaseListParams {
  page: number;

  size: number;

  constructor(params: BaseListParams) {
    if(params) {
      this.page = params.page;
      this.size = params.size;
    }
  }

  async validate() {
    return await BaseSchemaParams.validateAsync(this);
  }
}

export const BaseSchemaParams = joi.object<BaseListParams>({
  page: joi.number().max(999999999).empty(1).default(1),
  size: joi.number().max(1000).empty(10).default(10),
});
