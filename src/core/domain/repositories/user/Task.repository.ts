import { TaskEntity } from '../../entities';
import { TaskModel, TaskSchema } from '../../../database';
import { FilterQuery, Types } from 'mongoose';
import { BaseCRUDRepository } from '../base';
import { PaginationInterface, TaskRepositoryInterface } from '../../../infrastructure';

export class TaskRepository extends BaseCRUDRepository<TaskEntity, TaskSchema> implements TaskRepositoryInterface {
  async create(_task: TaskEntity): Promise<TaskEntity> {
    const task: TaskSchema = _task.convertToSchema();
    const created = await TaskModel.create(task);
    return new TaskEntity().convertToEntity(created)!;
  }

  async update(_task: TaskEntity): Promise<TaskEntity> {
    const task: TaskSchema = _task.convertToSchema();
    const updated = await TaskModel.findOneAndUpdate({ _id: _task.getId() }, { $set: task }, { new: true });

    if(!updated) {
      throw new Error('Task not found');
    }

    return new TaskEntity().convertToEntity(updated)!;
  }

  async getById(_id: Types.ObjectId): Promise<TaskEntity> {
    const found = await TaskModel.findOne({ _id });

    if(!found) {
      throw new Error('Task not found');
    }

    return new TaskEntity().convertToEntity(found)!;
  }

  async deleteById(_id: Types.ObjectId): Promise<boolean> {
    const deleted = await TaskModel.deleteOne({ _id });
    return deleted.deletedCount === 1;
  }

  async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<TaskEntity>> {
    const tasks = await TaskModel.find(filter);
    return this.multipleConverter(tasks, TaskEntity);
  }

  async countDocumentsByFilter(filter: FilterQuery<TaskSchema>): Promise<number> {
    return TaskModel.countDocuments(filter);
  }

  async getByUserId(_userId: Types.ObjectId): Promise<Array<TaskEntity>> {
    const found = await TaskModel.find({ userId: _userId });
    return this.multipleConverter(found, TaskEntity);
  }
}
