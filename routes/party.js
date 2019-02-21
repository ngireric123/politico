import express from 'express';
import Party from '../controllers/party';

const router = express.Router();
router.get('/', Party.getParties);

export default router;
