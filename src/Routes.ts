import { Router } from 'express';
import {
  CreateTaskController,
  CreateUserController,
  DeleteTaskByIdController,
  DeleteUserByIdController,
  GetTaskByIdController,
  GetTasksListByUserIdController,
  GetUserByIdController,
  GetUsersListController,
  ProfileChangePasswordController,
  ProfileLoginController,
  ProfileLogoutController,
  UpdateTaskController,
  UpdateUserController,
} from './controllers';
import { CheckAdminMiddleware, UserSessionMiddleware, UserTempSessionMiddleware } from './middlewares';

function nestedRoutes(path: string, configure: (router: Router) => void) {
  const router = Router({ mergeParams: true });
  router.use(path, router);
  configure(router);
  return router;
}

export const userRoutes = nestedRoutes('/user', user => {
  user.post('/', CreateUserController);
  user.post('/login', ProfileLoginController);
  user.put('/change-password', UserTempSessionMiddleware, ProfileChangePasswordController);

  user.use(UserSessionMiddleware);

  user.post('/logout', ProfileLogoutController);

  user.delete('/:id', CheckAdminMiddleware, DeleteUserByIdController);
  user.get('/list', CheckAdminMiddleware, GetUsersListController);
  user.get('/:id', CheckAdminMiddleware, GetUserByIdController);
  user.put('/:id', CheckAdminMiddleware, UpdateUserController);
});

export const taskRoutes = nestedRoutes('/task', task => {
  task.use(UserSessionMiddleware);

  task.post('/', CreateTaskController);
  task.get('/list/:userId', GetTasksListByUserIdController);
  task.get('/:id', GetTaskByIdController);
  task.put('/:id', UpdateTaskController);
  task.delete('/:id', DeleteTaskByIdController);
});