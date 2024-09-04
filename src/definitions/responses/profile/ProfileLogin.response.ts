import { UserEntity, UserSessionEntity, UserSessionStatusEnum, UserStatusEnum } from '../../../core';

export class ProfileLoginResponse {
  username: string;

  email: string;

  userStatus?: UserStatusEnum;

  accessToken?: string;

  sessionStatus?: UserSessionStatusEnum;

  expiresAt: Date;

  constructor(session: UserSessionEntity, user: UserEntity) {
    if(session && user) {
      this.username = user.getUsername();
      this.email = user.getEmail();
      this.userStatus = user.getStatus();
      this.accessToken = session.getAccessToken();
      this.sessionStatus = session.getStatus();
      this.expiresAt = session.getExpiresAt();
    }
  }
}
