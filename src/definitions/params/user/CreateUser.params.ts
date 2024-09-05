import * as joi from 'joi';
import { UserRoleEnum } from '../../../core';

export class CreateUserParams {
  username?: string;
  userRole?: UserRoleEnum;
  email?: string;

  constructor(params: CreateUserParams) {
    this.username = params.username;
    this.userRole = params.userRole;
    this.email = params.email;
  }

  async validate() {
    return await CreateUserParamsSchema.validateAsync(this);
  }
}

export const CreateUserParamsSchema = joi.object<CreateUserParams>({
  username: joi.string().trim().required(),
  userRole: joi.string().valid(...Object.values(UserRoleEnum)).required(),
  email: joi.string()
    .trim()
    .email()
    .required()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base': 'Invalid email format',
    }),
});
