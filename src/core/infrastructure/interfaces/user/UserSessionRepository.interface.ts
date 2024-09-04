import { BaseCRUDInterface } from '../base';
import { Types } from 'mongoose';
import { UserSessionEntity } from '../../../domain';

export interface UserSessionRepositoryInterface extends BaseCRUDInterface<UserSessionEntity> {
  deleteByUserId(_id: Types.ObjectId): Promise<boolean>;

  getByUserId(_user: Types.ObjectId): Promise<UserSessionEntity>;
}
