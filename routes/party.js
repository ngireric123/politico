import express from 'express';
import Party from '../controllers/party';

const router = express.Router();


router.get('/', Party.getAllParties);
router.post('/', Party.create);
//router.get('/:id', Party.getOne);
//router.patch('/:id', Party.update);
//router.delete('/:id', Party.remove);

export default router;
