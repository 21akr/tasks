import * as express from 'express';
import { PasswordService } from '../../services';
import { Repository, UserEntity, UserStatusEnum } from '../../core';
import { CreateUserParams, GetUserResponse } from '../../definitions';

export async function CreateUserController(req: express.Request, res: express.Response) {
  let response: GetUserResponse;
  let params: CreateUserParams;

  try {
    params = await new CreateUserParams(req.body).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    const checkUser = await Repository.User().getByEmail(params.email);
    if(checkUser) {
      return res.status(409).send('This email belongs to an existing user');
    }

    const passwordService = new PasswordService();

    const createPassword = await passwordService.newPassword();
    const hashedPassword = await passwordService.hash(createPassword);

    const newUser = new UserEntity()
      .buildUsername(params.username)
      .buildEmail(params.email)
      .buildStatus(UserStatusEnum.NEED_TO_CHANGE_PASSWORD)
      .buildUserRole(params.userRole)
      .buildPassword(hashedPassword);

    // EmailService.SendVerificationCode(email, otp)

    // await SendEmail({
    //   from: 'test@example.com',
    //   to: newUser.getEmail(),
    //   subject: 'Set your password for your new account',
    //   text: `Login: ${newUser.getEmail()}. Password: ${createPassword}`,
    // });
    console.log(createPassword);

    const created = await Repository.User().create(newUser);
    response = new GetUserResponse(created);
    return res.send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
}
