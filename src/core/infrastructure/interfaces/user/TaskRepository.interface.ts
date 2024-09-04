import { BaseCRUDInterface } from '../base';
import { TaskEntity } from '../../../domain';
import { Types } from 'mongoose';

export interface TaskRepositoryInterface extends BaseCRUDInterface<TaskEntity> {

  getByUserId(_userId: Types.ObjectId): Promise<Array<TaskEntity>>}
