import express from 'express';
import AuthValidation from './auth.validation';
import AuthController from './auth.controller';

import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.LoginSchema),
  AuthController.Login,
);

router.post(
  '/register',
  validateRequest(AuthValidation.RegisterSchema),
  AuthController.Register,
);

router.post('/logout', AuthController.Logout);

router.post('/refresh-token', AuthController.RefreshToken);

export const AuthRoutes = router;
