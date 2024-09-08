import * as express from 'express';
import { Types } from 'mongoose';
import { BaseIdParams } from '../../definitions';
import { Repository } from '../../core';

export async function DeleteTaskByIdController(req: express.Request, res: express.Response) {
  let params: BaseIdParams;

  try {
    params = await new BaseIdParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const task = await Repository.Task().getById(new Types.ObjectId(params.id));
    if(task.getUserId() !== req.user._id) {
      return res.send('You can delete only your tasks!');
    }

    const deleted = await Repository.Task().deleteById(task.getId());

    return res.json({ taskDeleted: deleted });
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
}
