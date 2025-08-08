import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),

  UserController.blockUserByAdmin,
);

router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers);

export const userRoutes = router;
