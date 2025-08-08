import express from 'express';
import { ProjectController } from './project.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/projects',
  auth(USER_ROLE.user),
  ProjectController.addProjectToClient,
);
router.get('/projects', auth(USER_ROLE.user), ProjectController.getAllProjects);
router.patch(
  '/projects/:id',
  auth(USER_ROLE.user),
  ProjectController.updateProject,
);
router.delete(
  '/projects/:id',
  auth(USER_ROLE.user),
  ProjectController.deleteProjectById,
);

export const projectRoutes = router;
