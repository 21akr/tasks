import * as express from 'express';
import { Types } from 'mongoose';
import { BaseIdParams, GetTaskResponse } from '../../definitions';
import { Repository } from '../../core';

export async function GetTaskByIdController(req: express.Request, res: express.Response) {
  let response: GetTaskResponse;
  let params: BaseIdParams;

  try {
    params = await new BaseIdParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const task = await Repository.Task().getById(new Types.ObjectId(params.id));
    if (!task) {
      res.send('Task Not Found');
    }

    response = new GetTaskResponse(task);
    return res.json(response);
  } catch (err) {
    return res.send(err);
  }
}
