import { Request, Response, NextFunction } from 'express';
import { CardController } from '../controllers/card.controller';

jest.mock('../services/card.service', () => ({
  cardService: {
    getAllCards: jest.fn(),
    getCardById: jest.fn(),
    createCard: jest.fn(),
    updateCard: jest.fn(),
    deleteCard: jest.fn(),
  },
}));

import { cardService } from '../services/card.service';

const mockCard = {
  id: 'test-uuid',
  title: 'Test Card',
  description: 'Test Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn() as unknown as NextFunction;

describe('CardController', () => {
  let controller: CardController;

  beforeEach(() => {
    controller = new CardController();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all cards', async () => {
      (cardService.getAllCards as jest.Mock).mockResolvedValue([mockCard]);
      const req = {} as Request;
      const res = mockRes();
      await controller.getAll(req, res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [mockCard] });
    });
  });

  describe('getById', () => {
    it('should return 404 when card not found', async () => {
      (cardService.getCardById as jest.Mock).mockResolvedValue(null);
      const req = { params: { id: 'notfound' } } as unknown as Request;
      const res = mockRes();
      await controller.getById(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return card when found', async () => {
      (cardService.getCardById as jest.Mock).mockResolvedValue(mockCard);
      const req = { params: { id: 'test-uuid' } } as unknown as Request;
      const res = mockRes();
      await controller.getById(req, res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCard });
    });
  });

  describe('create', () => {
    it('should create and return a new card', async () => {
      (cardService.createCard as jest.Mock).mockResolvedValue(mockCard);
      const req = { body: { title: 'Test Card', description: 'Test Desc' } } as Request;
      const res = mockRes();
      await controller.create(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCard });
    });

    it('should return 400 on validation error', async () => {
      const req = { body: { title: '' } } as Request;
      const res = mockRes();
      await controller.create(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('update', () => {
    it('should update and return card', async () => {
      (cardService.updateCard as jest.Mock).mockResolvedValue(mockCard);
      const req = { params: { id: 'test-uuid' }, body: { title: 'Updated' } } as unknown as Request;
      const res = mockRes();
      await controller.update(req, res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCard });
    });

    it('should return 404 when card not found', async () => {
      (cardService.updateCard as jest.Mock).mockResolvedValue(null);
      const req = { params: { id: 'x' }, body: { title: 'Test' } } as unknown as Request;
      const res = mockRes();
      await controller.update(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('remove', () => {
    it('should delete and return success', async () => {
      (cardService.deleteCard as jest.Mock).mockResolvedValue(true);
      const req = { params: { id: 'test-uuid' } } as unknown as Request;
      const res = mockRes();
      await controller.remove(req, res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Card deleted successfully' });
    });

    it('should return 404 when card not found', async () => {
      (cardService.deleteCard as jest.Mock).mockResolvedValue(false);
      const req = { params: { id: 'x' } } as unknown as Request;
      const res = mockRes();
      await controller.remove(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
