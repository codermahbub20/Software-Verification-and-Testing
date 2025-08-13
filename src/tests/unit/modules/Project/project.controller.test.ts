import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from 'http-status-ts';
import { ProjectService } from '../../../../../src/app/modules/Project/project.service';
import { ProjectController } from '../../../../../src/app/modules/Project/project.controller';
import sendResponse from '../../../../../src/app/utils/sendResponse';

// Mock sendResponse correctly
jest.mock('../../../src/app/utils/sendResponse', () => jest.fn());

// Mock ProjectService methods
jest.mock('../../../src/app/modules/Project/project.service', () => ({
  ProjectService: {
    addProjectToClient: jest.fn(),
    getAllProjects: jest.fn(),
    updateProjectById: jest.fn(),
    deleteProjectById: jest.fn(),
  },
}));

describe('ProjectController Unit Tests', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { body: {}, params: {}, query: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  // ===== addProjectToClient =====
  describe('addProjectToClient', () => {
    it('should send success response', async () => {
      const mockData = { id: '123', name: 'Test Project' };
      (ProjectService.addProjectToClient as jest.Mock).mockResolvedValue(mockData);
      mockReq.body = { name: 'Test Project' };

      await ProjectController.addProjectToClient(mockReq as Request, mockRes as Response, mockNext);

      expect(ProjectService.addProjectToClient).toHaveBeenCalledWith({ name: 'Test Project' });
      expect(sendResponse).toHaveBeenCalledWith(mockRes, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'Client Project add successfully',
        data: mockData,
      });
    });

    it('should call next with error when service throws', async () => {
      const error = new Error('Service error');
      (ProjectService.addProjectToClient as jest.Mock).mockRejectedValue(error);
      mockReq.body = { name: 'Test Project' };

      await ProjectController.addProjectToClient(mockReq as Request, mockRes as Response, mockNext);

      // Verify next called correctly
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  // ===== getAllProjects =====
  describe('getAllProjects', () => {
    it('should send projects successfully', async () => {
      const mockProjects = [{ id: '1', name: 'Project 1' }];
      (ProjectService.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

      await ProjectController.getAllProjects(mockReq as Request, mockRes as Response, mockNext);

      expect(ProjectService.getAllProjects).toHaveBeenCalledWith(mockReq.query);
      expect(sendResponse).toHaveBeenCalledWith(mockRes, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: ' Project retraived successfully',
        data: mockProjects,
      });
    });

    it('should call next with error when service throws', async () => {
      const error = new Error('Service error');
      (ProjectService.getAllProjects as jest.Mock).mockRejectedValue(error);

      await ProjectController.getAllProjects(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  // ===== updateProject =====
  describe('updateProject', () => {
    it('should update successfully', async () => {
      const mockUpdated = { id: '123', name: 'Updated Project' };
      (ProjectService.updateProjectById as jest.Mock).mockResolvedValue(mockUpdated);
      mockReq.params = { id: '123' };
      mockReq.body = { name: 'Updated Project' };

      await ProjectController.updateProject(mockReq as Request, mockRes as Response, mockNext);

      expect(ProjectService.updateProjectById).toHaveBeenCalledWith('123', { name: 'Updated Project' });
      expect(sendResponse).toHaveBeenCalledWith(mockRes, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Project updated successfully',
        data: mockUpdated,
      });
    });

    it('should call next with error when service throws', async () => {
      const error = new Error('Service error');
      (ProjectService.updateProjectById as jest.Mock).mockRejectedValue(error);
      mockReq.params = { id: '123' };

      await ProjectController.updateProject(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  // ===== deleteProjectById =====
  describe('deleteProjectById', () => {
    it('should delete successfully', async () => {
      const mockDeleted = { acknowledged: true, deletedCount: 1 };
      (ProjectService.deleteProjectById as jest.Mock).mockResolvedValue(mockDeleted);
      mockReq.params = { id: '123' };

      await ProjectController.deleteProjectById(mockReq as Request, mockRes as Response, mockNext);

      expect(ProjectService.deleteProjectById).toHaveBeenCalledWith('123');
      expect(sendResponse).toHaveBeenCalledWith(mockRes, {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Project deleted successfully',
        data: mockDeleted,
      });
    });

    it('should call next with error when service throws', async () => {
      const error = new Error('Service error');
      (ProjectService.deleteProjectById as jest.Mock).mockRejectedValue(error);
      mockReq.params = { id: '123' };

      await ProjectController.deleteProjectById(mockReq as Request, mockRes as Response, mockNext);

      // Corrected assertions: should be called once with the error
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
