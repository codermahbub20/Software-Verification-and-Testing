import { HttpStatus } from 'http-status-ts';
import sendResponse from '../../utils/sendResponse';
import { LogsService } from './logs.service';
import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';

const addLogs = CatchAsync(async (req: Request, res: Response) => {
  const result = await LogsService.addLogs(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Logs add successfully',
    data: result,
  });
});

const getAllLogs = CatchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await LogsService.getAllLogs(query);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Get all logs successfully',
    data: result,
  });
});

export const LogsController = { addLogs, getAllLogs };
