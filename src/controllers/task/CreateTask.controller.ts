import * as express from 'express';
import { Repository, TaskEntity } from '../../core';
import { CreateTaskParams, GetTaskResponse } from '../../definitions';

export async function CreateTaskController(req: express.Request, res: express.Response) {
  let params: CreateTaskParams;
  let response: GetTaskResponse;

  try {
    params = await new CreateTaskParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const newTask = new TaskEntity()
      .buildStatus(params?.status)
      .buildTitle(params?.title)
      .buildDescription(params?.description);

    if (params.userId) {
      newTask.buildUserId(params?.userId);
    } else {
      newTask.buildUserId(req.user._id);
    }

    const created = await Repository.Task().create(newTask);

    response = new GetTaskResponse(created);
    return res.send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
}
