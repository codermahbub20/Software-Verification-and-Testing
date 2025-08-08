"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("./client.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
// import auth from '../../middlewares/auth';
const router = express_1.default.Router();
router.post('/clients', (0, auth_1.default)(user_constant_1.USER_ROLE.user), client_controller_1.ClientController.createClient);
router.get('/clients', (0, auth_1.default)(user_constant_1.USER_ROLE.user), client_controller_1.ClientController.getAllClients);
router.patch('/client/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), client_controller_1.ClientController.updateClient);
router.delete('/client/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), client_controller_1.ClientController.deleteClient);
exports.clientRoutes = router;
