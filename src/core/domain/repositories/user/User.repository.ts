import { UserEntity } from '../../entities';
import { UserModel, UserSchema } from '../../../database';
import { FilterQuery, Types } from 'mongoose';
import { PaginationInterface, UserRepositoryInterface, UserRoleEnum } from '../../../infrastructure';
import { BaseCRUDRepository } from '../base';

export class UserRepository extends BaseCRUDRepository<UserEntity, UserSchema> implements UserRepositoryInterface {
  async create(_user: UserEntity): Promise<UserEntity> {
    const user: UserSchema = _user.convertToSchema();
    const created = await UserModel.create(user);
    return new UserEntity().convertToEntity(created)!;
  }

  async update(_user: UserEntity): Promise<UserEntity> {
    const user: UserSchema = _user.convertToSchema();
    const updated = await UserModel.findOneAndUpdate({ _id: _user.getId() }, { $set: user }, { new: true });
    return new UserEntity().convertToEntity(updated)!;
  }

  async getById(_id: Types.ObjectId): Promise<UserEntity> {
    const found = await UserModel.findOne({ _id });
    return new UserEntity().convertToEntity(found)!;
  }

  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await UserModel.deleteOne({ _id });
    return deleted.deletedCount === 1;
  }

  async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<UserEntity>> {
    const users = await UserModel.find(filter);
    return this.multipleConverter(users, UserEntity);
  }

  async isAdmin(user: UserEntity): Promise<boolean> {
    return user.getUserRole() === UserRoleEnum.ADMIN;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const found = await UserModel.findOne({ email });
    return new UserEntity().convertToEntity(found);
  }

  async countDocumentsByFilter(filter: FilterQuery<UserSchema>): Promise<number> {
    return UserModel.countDocuments(filter);
  }
}
