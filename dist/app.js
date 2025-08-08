"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
// import notFound from './app/middlewares/notFound';
const app = (0, express_1.default)();
// Use CORS with proper configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // ✅ your frontend URL
    credentials: true, // ✅ allow cookies, headers, etc.
}));
app.use(express_1.default.json());
// Application routes
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello CRM World!');
});
app.use(globalErrorHandler_1.default);
// app.use(notFound);
exports.default = app;
