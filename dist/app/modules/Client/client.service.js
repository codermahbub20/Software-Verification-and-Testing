"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const client_model_1 = require("./client.model");
const createClient = (clientData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.create(clientData);
    return result;
});
const getAllClients = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = query;
    const filter = userEmail ? { userEmail } : {};
    const result = yield client_model_1.Client.find(filter);
    return result;
});
const deleteClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.findByIdAndDelete(id);
    return result;
});
const updateClientById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.findByIdAndUpdate(id, updateData, { new: true });
    return result;
});
exports.ClientService = {
    createClient,
    getAllClients,
    updateClientById,
    deleteClientById,
};
