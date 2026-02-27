import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { cardService } from '../services/card.service';

const createCardSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().min(1, 'Description is required'),
});

const updateCardSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
});

export class CardController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cards = await cardService.getAllCards();
      res.json({ success: true, data: cards });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const card = await cardService.getCardById(req.params.id);
      if (!card) {
        res.status(404).json({ success: false, message: 'Card not found' });
        return;
      }
      res.json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = createCardSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
        return;
      }
      const card = await cardService.createCard(parsed.data);
      res.status(201).json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parsed = updateCardSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, errors: parsed.error.flatten().fieldErrors });
        return;
      }
      const card = await cardService.updateCard(req.params.id, parsed.data);
      if (!card) {
        res.status(404).json({ success: false, message: 'Card not found' });
        return;
      }
      res.json({ success: true, data: card });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await cardService.deleteCard(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Card not found' });
        return;
      }
      res.json({ success: true, message: 'Card deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}

export const cardController = new CardController();
