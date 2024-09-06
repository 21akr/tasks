import * as joi from 'joi';

export class ProfileChangePasswordParams {
  currentPassword?: string;
  newPassword?: string;

  constructor(params: ProfileChangePasswordParams) {
    this.currentPassword = params.currentPassword;
    this.newPassword = params.newPassword;
  }

  async validate() {
    return await ProfileChangePasswordParamsSchema.validateAsync(this);
  }
}

export const ProfileChangePasswordParamsSchema = joi.object<ProfileChangePasswordParams>({
  currentPassword: joi.string().trim().min(8).max(20).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/).required(),
  newPassword: joi.string().trim().min(8).max(20).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/).required()
    .messages({
      'string.pattern.base': 'Password must contain at least one letter and one number',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 20 characters',
    }),
});


