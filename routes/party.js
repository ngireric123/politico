import express from 'express';
import Party from '../controllers/party';

const router = express.Router();
router.post('/', Party.createParty);
router.get('/', Party.getParties);
router.get('/:id', Party.getParty);
router.patch('/:id', Party.updateParty);
router.delete('/:id', Party.delete);
export default router;
