import joi from 'joi';
import { UserRoleEnum } from '../../../core';

export class UpdateUserParams {
  username?: string;
  userRole?: UserRoleEnum;

  constructor(params: UpdateUserParams) {
    this.username = params.username;
    this.userRole = params.userRole;
  }

  async validate() {
    return await UpdateUserParamsSchema.validateAsync(this);
  }
}

export const UpdateUserParamsSchema = joi.object<UpdateUserParams>({
  username: joi.string().trim(),
  userRole: joi.string().valid(...Object.values(UserRoleEnum)),
});
