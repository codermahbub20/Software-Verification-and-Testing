import { TClient } from './client.interface';
import { Client } from './client.model';

const createClient = async (clientData: TClient) => {
  const result = await Client.create(clientData);
  return result;
};

const getAllClients = async (query: any) => {
  const { userEmail } = query;
  const filter = userEmail ? { userEmail } : {};
  const result = await Client.find(filter);
  return result;
};

const deleteClientById = async (id: string) => {
  const result = await Client.findByIdAndDelete(id);
  return result;
};

const updateClientById = async (id: string, updateData: Partial<TClient>) => {
  const result = await Client.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

export const ClientService = {
  createClient,
  getAllClients,
  updateClientById,
  deleteClientById,
};
