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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const http_status_ts_1 = require("http-status-ts");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const logs_model_1 = require("./logs.model");
const client_model_1 = require("../Client/client.model");
const project_model_1 = require("../Project/project.model");
const addLogs = (interactionData) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield client_model_1.Client.findById(interactionData.clientId);
    if (!client) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'Client not found');
    }
    const project = yield project_model_1.Project.findById(interactionData.projectId);
    if (!project) {
        throw new AppError_1.default(http_status_ts_1.HttpStatus.NOT_FOUND, 'Project not found');
    }
    const logs = yield logs_model_1.InteractionLog.create(interactionData);
    return logs;
});
const getAllLogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = query;
    const filter = userEmail ? { userEmail } : {};
    const result = yield logs_model_1.InteractionLog.find(filter)
        .populate('clientId')
        .populate('projectId');
    return result;
});
exports.LogsService = { addLogs, getAllLogs };
