import * as express from 'express';
import { BaseUserRequestInterface, Repository, UserSessionStatusEnum } from '../../core';

export async function ProfileLogoutController(req: BaseUserRequestInterface, res: express.Response) {
  const session = req?.session;
  console.log(req);
  try {
    if (!session) {
      return res.status(400).json({ error: 'Session not found' });
    }
    await session.buildStatus(UserSessionStatusEnum.INACTIVE);

    await Repository.UserSession().update(session);

    return res.status(200).send('Logged out!');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
