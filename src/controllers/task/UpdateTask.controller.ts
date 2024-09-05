import * as express from 'express';
import { Types } from 'mongoose';
import { BaseIDParams, GetTaskResponse, UpdateTaskParams } from '../../definitions';
import { Repository } from '../../core';

export async function UpdateTaskController(req: express.Request, res: express.Response) {
  let response: GetTaskResponse;
  let idParams: BaseIDParams;
  let params: UpdateTaskParams;

  try {
    idParams = await new BaseIDParams(req.params).validate();
    params = await new UpdateTaskParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const task = await Repository.Task().getById(new Types.ObjectId(idParams.ID));
    if (!task) {
      res.send('Task Not Found');
    }

    const updated = task.buildUserId(params?.userId).buildTitle(params?.title).buildDescription(params?.description).buildStatus(params?.status);

    response = new GetTaskResponse(updated);
    return res.json(response);
  } catch (err) {
    return res.send(err);
  }
}
