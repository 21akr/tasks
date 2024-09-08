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
    const user = await Repository.User().getById(req.user._id);
    if(!user) {
      return res.status(404).send('User Not Found');
    }

    const newTask = new TaskEntity()
      .buildUserId(user.getId())
      .buildStatus(params?.status)
      .buildTitle(params?.title)
      .buildDescription(params?.description);

    const created = await Repository.Task().create(newTask);

    response = new GetTaskResponse(created);
    return res.send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
}
