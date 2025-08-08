import { Request, Response } from 'express';
import { UserServices } from '../../../../app/modules/User/user.service';
import { UserController } from '../../../../app/modules/User/user.controller';

// Mock the entire UserServices module
jest.mock('../../../../app/modules/User/user.service');

const next = jest.fn();

describe('UserController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis(); // chainable res.status()
    jsonMock = jest.fn();

    mockReq = {};
    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user and send response', async () => {
      const userData = {
        _id: 'someid',
        name: 'John',
        email: 'john@example.com',
        role: 'user',
      };

      mockReq.body = { name: 'John', email: 'john@example.com', password: 'pass', role: 'user' };
      (UserServices.createUserInToDB as jest.Mock).mockResolvedValue(userData);

      await UserController.createUser(mockReq as Request, mockRes as Response, next);

      expect(UserServices.createUserInToDB).toHaveBeenCalledWith(mockReq.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'User registered successfully',
        data: userData,
      });
    });
  });

  describe('getAllUsers', () => {
    it('should fetch all users and send response', async () => {
      const users = [
        { _id: '1', name: 'User 1', email: 'u1@example.com' },
        { _id: '2', name: 'User 2', email: 'u2@example.com' },
      ];

      (UserServices.getAllUserFromDB as jest.Mock).mockResolvedValue(users);

      await UserController.getAllUsers(mockReq as Request, mockRes as Response, next);

      expect(UserServices.getAllUserFromDB).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'Users are fetched  successfully',
        data: users,
      });
    });
  });

  describe('blockUserByAdmin', () => {
    it('should block a user and send response', async () => {
      const userId = 'userid123';
      mockReq.params = { userId };

      (UserServices.blockedUserByAdminFromDB as jest.Mock).mockResolvedValue({ isBlocked: true });

      await UserController.blockUserByAdmin(mockReq as Request, mockRes as Response, next);

      expect(UserServices.blockedUserByAdminFromDB).toHaveBeenCalledWith(userId);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        success: true,
        message: 'User Blocked successfully',
        data: {},
      });
    });
  });
});
