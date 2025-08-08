import { Request, RequestHandler, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';
import { UserServices } from './user.service';

const createUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserInToDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = CatchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Users are fetched  successfully',
    data: result,
  });
});

const blockUserByAdmin: RequestHandler = CatchAsync(async (req, res) => {
  const id = req.params.userId;

  // Add the client's ID
  await UserServices.blockedUserByAdminFromDB(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User Blocked successfully',
    data: {},
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  blockUserByAdmin,
};
