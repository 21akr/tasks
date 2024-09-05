import * as express from 'express';
import { BaseUserRequestInterface, Repository, UserSessionStatusEnum, UserStatusEnum } from '../../core';

export async function ProfileLogoutController(req: BaseUserRequestInterface, res: express.Response) {
  const user = req?.user;
  const session = req?.session;

  try {
    await user.buildStatus(UserStatusEnum.INACTIVE);
    await session.buildStatus(UserSessionStatusEnum.INACTIVE);

    await Repository.User().update(user);
    await Repository.UserSession().update(session);

    return res.status(200).send('Logged out!');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
