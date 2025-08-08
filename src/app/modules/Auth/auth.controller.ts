import sendResponse from '../../utils/sendResponse';

import config from '../../config';
import AuthService from './auth.service';
import CatchAsync from '../../utils/CatchAsync';
import { HttpStatus } from 'http-status-ts';

const Login = CatchAsync(async (req, res) => {
  const result = await AuthService.Login(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie('REFRESH_TOKEN', refreshToken, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: config.node_env === 'development' ? 'strict' : 'none',
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Login successful',
    data: {
      token: accessToken,
    },
  });
});

const Register = CatchAsync(async (req, res) => {
  const result = await AuthService.Register(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie('REFRESH_TOKEN', refreshToken, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: config.node_env === 'development' ? 'strict' : 'none',
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.CREATED,
    message: 'User registered successfully',
    data: {
      token: accessToken,
    },
  });
});

const Logout = CatchAsync(async (_req, res) => {
  res.clearCookie('REFRESH_TOKEN');

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Logout successful',
    data: null,
  });
});

const RefreshToken = CatchAsync(async (req, res) => {
  const { REFRESH_TOKEN } = req.cookies;

  const result = await AuthService.RefreshToken(REFRESH_TOKEN);

  const { accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: HttpStatus.OK,
    message: 'Token refreshed successfully',
    data: {
      token: accessToken,
    },
  });
});

const AuthController = {
  Login,
  Register,
  Logout,
  RefreshToken,
};

export default AuthController;
