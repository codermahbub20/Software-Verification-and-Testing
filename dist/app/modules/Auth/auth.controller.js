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
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const config_1 = __importDefault(require("../../config"));
const auth_service_1 = __importDefault(require("./auth.service"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const http_status_ts_1 = require("http-status-ts");
const Login = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.Login(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('REFRESH_TOKEN', refreshToken, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        httpOnly: true,
        secure: config_1.default.node_env === 'production',
        sameSite: config_1.default.node_env === 'development' ? 'strict' : 'none',
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: 'Login successful',
        data: {
            token: accessToken,
        },
    });
}));
const Register = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.default.Register(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('REFRESH_TOKEN', refreshToken, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        httpOnly: true,
        secure: config_1.default.node_env === 'production',
        sameSite: config_1.default.node_env === 'development' ? 'strict' : 'none',
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        message: 'User registered successfully',
        data: {
            token: accessToken,
        },
    });
}));
const Logout = (0, CatchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('REFRESH_TOKEN');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: 'Logout successful',
        data: null,
    });
}));
const RefreshToken = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { REFRESH_TOKEN } = req.cookies;
    const result = yield auth_service_1.default.RefreshToken(REFRESH_TOKEN);
    const { accessToken } = result;
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_ts_1.HttpStatus.OK,
        message: 'Token refreshed successfully',
        data: {
            token: accessToken,
        },
    });
}));
const AuthController = {
    Login,
    Register,
    Logout,
    RefreshToken,
};
exports.default = AuthController;
