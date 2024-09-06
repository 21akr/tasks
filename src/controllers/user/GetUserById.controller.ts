import * as express from 'express';
import { Types } from 'mongoose';
import { BaseIdParams, GetUserResponse } from '../../definitions';
import { Repository } from '../../core';

export async function GetUserByIdController(req: express.Request, res: express.Response) {
  let response: GetUserResponse;
  let params: BaseIdParams;

  try {
    params = await new BaseIdParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const user = await Repository.User().getById(new Types.ObjectId(params.id));
    if (!user) {
      res.send('User Not Found');
    }

    response = new GetUserResponse(user);
    return res.json(response);
  } catch (err) {
    return res.send(err);
  }
}
