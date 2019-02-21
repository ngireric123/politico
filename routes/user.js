import express from 'express';
import User from '../controllers/user';

const router = express.Router();

router.post('/', User.create);
router.post('/login', User.login);
// router.post('/api/v1/auth/login', validateUsers.login, Users.login);
export default router;
