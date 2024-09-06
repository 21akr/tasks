import * as express from 'express';
import { Types } from 'mongoose';
import { BaseIdParams } from '../../definitions';
import { Repository } from '../../core';

export async function DeleteUserByIdController(req: express.Request, res: express.Response) {
  let params: BaseIdParams;

  try {
    params = await new BaseIdParams(req.params).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const deleteSessions = await Repository.UserSession().deleteByUserId(new Types.ObjectId(params.id));
    const deleteUser = await Repository.User().deleteById(new Types.ObjectId(params.id));

    return res.json({ userDeleted: deleteUser, sessionsDeleted: deleteSessions });
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
}
