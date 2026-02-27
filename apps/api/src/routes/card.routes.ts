import { Router } from 'express';
import { cardController } from '../controllers/card.controller';

const router = Router();

router.get('/', cardController.getAll.bind(cardController));
router.get('/:id', cardController.getById.bind(cardController));
router.post('/', cardController.create.bind(cardController));
router.put('/:id', cardController.update.bind(cardController));
router.delete('/:id', cardController.remove.bind(cardController));

export default router;
