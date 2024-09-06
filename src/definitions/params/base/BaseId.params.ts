import * as joi from 'joi';

export class BaseIdParams {
  id?: string;

  constructor(params: any) {
    if (params) {
      this.id = params.id;
    }
  }

  async validate() {
    return await BaseIDParamsSchema.validateAsync(this);
  }
}

export const BaseIDParamsSchema = joi.object<BaseIdParams>({
  id: joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
});
