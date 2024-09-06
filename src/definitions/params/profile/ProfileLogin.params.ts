import * as joi from 'joi';

export class ProfileLoginParams {
  email?: string;
  password?: string;

  constructor(params: ProfileLoginParams) {
    this.email = params.email;
    this.password = params.password;
  }

  async validate() {
    return await ProfileLoginParamsSchema.validateAsync(this);
  }
}

export const ProfileLoginParamsSchema = joi.object<ProfileLoginParams>({
  email: joi.string()
    .trim()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'Invalid email format',
    }),
  password: joi.string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    .required(),

});
