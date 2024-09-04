import { getModelForClass } from '@typegoose/typegoose';
import { TaskSchema } from '../schemas';

export const TaskModel = getModelForClass(TaskSchema, {
  schemaOptions: {
    collection: 'tasks',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});
