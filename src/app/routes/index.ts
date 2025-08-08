import { Router } from 'express';

import { userRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { clientRoutes } from '../modules/Client/client.route';
import { projectRoutes } from '../modules/Project/project.route';
import { logsRoutes } from '../modules/Logs/logs.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: userRoutes,
  },
  {
    path: '/',
    route: clientRoutes,
  },
  {
    path: '/',
    route: projectRoutes,
  },
  {
    path: '/',
    route: logsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
