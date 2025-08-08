"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.patch('/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.blockUserByAdmin);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
exports.userRoutes = router;
