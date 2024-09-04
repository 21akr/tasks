import { BaseCRUDInterface } from './base';
import { UserEntity } from '../../domain';

export interface UserRepositoryInterface extends BaseCRUDInterface<UserEntity> {

  isAdmin(user: UserEntity): Promise<boolean>;
}
