import { FilterQuery } from 'mongoose';
import { PaginationInterface } from '../../../core';

export interface ListParams {
  pagination: PaginationInterface;
  filter: FilterQuery<any>;
  sort: any;
}
