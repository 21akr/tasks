import * as joi from 'joi';

export class BaseEmailParams {
  email?: string;

  constructor(params: BaseEmailParams) {
    this.email = params.email;
  }

  async validate() {
    return await BaseEmailParamsSchema.validateAsync(this);
  }
}

export const BaseEmailParamsSchema = joi.object<BaseEmailParams>({
  email: joi.string()
    .trim()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'Invalid email format',
    }),
});
