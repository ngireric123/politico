import express from 'express';
import auth from '../middleware/auth';
import Election from '../controllers/candidate';

const router = express.Router();

router.post('/', auth, Election.vote);

export default router;
