import { FilterQuery, Types } from 'mongoose';
import { PaginationInterface } from './Pagination.interface';

export interface BaseCRUDRepositoryInterface<K> {
  create(arg: K): Promise<K>;

  update(arg: K): Promise<K>;

  getById(id: Types.ObjectId): Promise<K>;

  list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<K>>;
}

