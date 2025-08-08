import express from 'express';
import { LogsController } from './logs.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/logs', auth(USER_ROLE.user), LogsController.addLogs);
// router.get('/projects', ProjectController.getAllProjects);
router.get('/logs', auth(USER_ROLE.user), LogsController.getAllLogs);

export const logsRoutes = router;
