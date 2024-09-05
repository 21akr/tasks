import { Router } from 'express';
import {
  CreateUserController,
  DeleteUserByIdController,
  GetUserByIdController,
  GetUsersListController,
  ProfileLoginController,
  ProfileLogoutController,
  UpdateUserController,
} from './controllers';
import { CheckAdminMiddleware, UserSessionMiddleware } from './middlewares';

function nestedRoutes(path: string, configure: (router: Router) => void) {
  const router = Router({ mergeParams: true });
  router.use(path, router);
  configure(router);
  return router;
}

export const routes = nestedRoutes('/user', user => {
  user.post('/', CreateUserController);
  user.post('/login', ProfileLoginController);
  user.post('/logout', ProfileLogoutController);

  user.use(UserSessionMiddleware);
  user.delete('/:id', CheckAdminMiddleware, DeleteUserByIdController);
  user.get('/list', CheckAdminMiddleware, GetUsersListController);
  user.get('/:id', CheckAdminMiddleware, GetUserByIdController);
  user.put('/:id', CheckAdminMiddleware, UpdateUserController);
});
