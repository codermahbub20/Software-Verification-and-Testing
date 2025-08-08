"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const client_route_1 = require("../modules/Client/client.route");
const project_route_1 = require("../modules/Project/project.route");
const logs_route_1 = require("../modules/Logs/logs.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/admin',
        route: user_route_1.userRoutes,
    },
    {
        path: '/',
        route: client_route_1.clientRoutes,
    },
    {
        path: '/',
        route: project_route_1.projectRoutes,
    },
    {
        path: '/',
        route: logs_route_1.logsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
