import express from 'express';
import { ClientController } from './client.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

// import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/clients', auth(USER_ROLE.user), ClientController.createClient);
router.get('/clients', auth(USER_ROLE.user), ClientController.getAllClients);
router.patch(
  '/client/:id',
  auth(USER_ROLE.user),
  ClientController.updateClient,
);
router.delete(
  '/client/:id',
  auth(USER_ROLE.user),
  ClientController.deleteClient,
);

export const clientRoutes = router;
