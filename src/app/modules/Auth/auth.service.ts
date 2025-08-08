import { HttpStatus } from 'http-status-ts';
import AppError from '../../Errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import AuthUtils from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const Login = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'No user found with this email');
  }

  const is_blocked = user?.isBlocked;

  if (is_blocked) {
    throw new AppError(HttpStatus.FORBIDDEN, 'User is blocked');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid password');
  }

  if (!user._id) {
    throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR, 'User ID is missing');
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const Register = async (payload: TRegisterUser) => {
  const isUserExists = await User.isUserExistByEmail(payload.email);

  if (isUserExists) {
    throw new AppError(HttpStatus.CONFLICT, 'User already exists');
  }

  const user = await User.create({ ...payload });

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const RefreshToken = async (refreshToken: string) => {
  const decoded = AuthUtils.VerifyToken(
    refreshToken,
    config.jwt_refresh_token_secret as string,
  ) as JwtPayload;

  const user = await User.findOne({ _id: decoded.id, is_blocked: false });

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'No user found');
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  return { accessToken };
};

const AuthService = { Login, Register, RefreshToken };

export default AuthService;
