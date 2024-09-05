import * as express from 'express';
import { Types } from 'mongoose';
import { Repository } from '../../core';
import { BaseIDParams, GetUserResponse, UpdateUserParams } from '../../definitions';

export async function UpdateUserController(req: express.Request, res: express.Response) {
  let response: GetUserResponse;
  let idParams: BaseIDParams;
  let params: UpdateUserParams;

  try {
    idParams = await new BaseIDParams(req.params).validate();
    params = await new UpdateUserParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const user = await Repository.User().getById(new Types.ObjectId(idParams.ID));
    if (!user) {
      res.send('User Not Found');
    }

    const updated = user.buildUsername(params.username).buildUserRole(params.userRole);

    response = new GetUserResponse(updated);
    return res.json(response);
  } catch (err) {
    return res.send(err);
  }
}
