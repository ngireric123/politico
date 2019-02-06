import express from 'express';
import Party from '../controllers/party';

const router = express.Router();


router.get('/', Party.getAllParties);
router.post('/', Party.create);
router.get('/:id', Party.fetchOne);
router.patch('/:id', Party.update);

export default router;
