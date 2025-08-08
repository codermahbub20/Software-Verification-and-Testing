"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/projects', (0, auth_1.default)(user_constant_1.USER_ROLE.user), project_controller_1.ProjectController.addProjectToClient);
router.get('/projects', (0, auth_1.default)(user_constant_1.USER_ROLE.user), project_controller_1.ProjectController.getAllProjects);
router.patch('/projects/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), project_controller_1.ProjectController.updateProject);
router.delete('/projects/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), project_controller_1.ProjectController.deleteProjectById);
exports.projectRoutes = router;
