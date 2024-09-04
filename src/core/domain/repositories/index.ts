import { TaskRepositoryInterface, UserRepositoryInterface, UserSessionRepositoryInterface } from '../../infrastructure';
import { UserRepository, UserSessionRepository } from './';
import { TaskRepository } from './user';

class Repositories {
  protected _userRepository: UserRepositoryInterface;
  protected _userSessionRepository: UserSessionRepositoryInterface;
  protected _taskRepository: TaskRepositoryInterface;

  User(): UserRepositoryInterface {
    if(!this._userRepository) this._userRepository = new UserRepository();
    return this._userRepository;
  }

  UserSession(): UserSessionRepositoryInterface {
    if(!this._userSessionRepository) this._userSessionRepository = new UserSessionRepository();
    return this._userSessionRepository;
  }

  Task(): TaskRepositoryInterface {
    if(!this._taskRepository) this._taskRepository = new TaskRepository();
    return this._taskRepository;

  }
}

export * from './user';
export * from './base';

export const Repository = new Repositories();
