import * as express from 'express';
import { Types } from 'mongoose';
import { BaseIDParams } from '../../definitions';
import { Repository } from '../../core';

export async function DeleteTaskByIdController(req: express.Request, res: express.Response) {
  let params: BaseIDParams;

  try {
    params = await new BaseIDParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const deleted = await Repository.Task().deleteById(new Types.ObjectId(params.ID));

    return res.json({ taskDeleted: deleted });
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
}
