import { HttpStatus } from 'http-status-ts';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { ClientService } from './client.service';

const createClient = CatchAsync(async (req: Request, res: Response) => {
  const result = await ClientService.createClient(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Create Client successfully',
    data: result,
  });
});

const getAllClients = CatchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ClientService.getAllClients(query);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Get all Clients successfully',
    data: result,
  });
});

const updateClient = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ClientService.updateClientById(id, updateData);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Client updated successfully',
    data: result,
  });
});

const deleteClient = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log('Deleting client with ID:', id);
  const result = await ClientService.deleteClientById(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Client deleted successfully',
    data: result,
  });
});

export const ClientController = {
  createClient,
  getAllClients,
  updateClient,
  deleteClient,
};
