import express from 'express';
import User from '../controllers/user';

const router = express.Router();

// router.post('/', User.create);
// router.post('/login', User.login);

router.post('/signup', User.create);
router.post('/login', User.login);

export default router;
