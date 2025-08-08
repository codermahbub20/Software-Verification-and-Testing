"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const logs_controller_1 = require("./logs.controller");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/logs', (0, auth_1.default)(user_constant_1.USER_ROLE.user), logs_controller_1.LogsController.addLogs);
// router.get('/projects', ProjectController.getAllProjects);
router.get('/logs', (0, auth_1.default)(user_constant_1.USER_ROLE.user), logs_controller_1.LogsController.getAllLogs);
exports.logsRoutes = router;
