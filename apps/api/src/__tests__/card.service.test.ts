import { CardService } from '../services/card.service';

// Mock the database
jest.mock('../db', () => ({
  getDb: jest.fn(),
  schema: {
    cards: 'cards_table',
  },
}));

jest.mock('../analytics', () => ({
  analyticsService: {
    track: jest.fn(),
  },
}));

import { getDb } from '../db';
import { analyticsService } from '../analytics';

const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockFrom = jest.fn();
const mockWhere = jest.fn();
const mockOrderBy = jest.fn();
const mockValues = jest.fn();
const mockSet = jest.fn();

const mockCard = {
  id: 'test-uuid-123',
  title: 'Test Card',
  description: 'Test Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CardService', () => {
  let service: CardService;
  let mockDb: Record<string, unknown>;

  beforeEach(() => {
    service = new CardService();

    mockOrderBy.mockResolvedValue([mockCard]);
    mockWhere.mockResolvedValue([mockCard]);
    mockFrom.mockReturnValue({ where: mockWhere, orderBy: mockOrderBy });
    mockSelect.mockReturnValue({ from: mockFrom });
    mockValues.mockResolvedValue([]);
    mockInsert.mockReturnValue({ values: mockValues });
    mockSet.mockReturnValue({ where: mockWhere });
    mockUpdate.mockReturnValue({ set: mockSet });
    mockDelete.mockReturnValue({ where: jest.fn().mockResolvedValue([]) });

    mockDb = {
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    };

    (getDb as jest.Mock).mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCards', () => {
    it('should return all cards', async () => {
      const cards = await service.getAllCards();
      expect(cards).toEqual([mockCard]);
      expect(analyticsService.track).toHaveBeenCalledWith('cards.listed', { count: 1 });
    });
  });

  describe('getCardById', () => {
    it('should return a card by id', async () => {
      const card = await service.getCardById('test-uuid-123');
      expect(card).toEqual(mockCard);
      expect(analyticsService.track).toHaveBeenCalledWith('card.viewed', { id: 'test-uuid-123' });
    });

    it('should return null when card not found', async () => {
      mockWhere.mockResolvedValueOnce([]);
      const card = await service.getCardById('nonexistent');
      expect(card).toBeNull();
    });
  });

  describe('createCard', () => {
    it('should create a card and return it', async () => {
      const input = { title: 'New Card', description: 'New Description' };
      const card = await service.createCard(input);
      expect(card).toEqual(mockCard);
      expect(mockInsert).toHaveBeenCalled();
      expect(analyticsService.track).toHaveBeenCalledWith('card.created', expect.any(Object));
    });
  });

  describe('updateCard', () => {
    it('should update a card and return it', async () => {
      const input = { title: 'Updated Title' };
      const card = await service.updateCard('test-uuid-123', input);
      expect(card).toEqual(mockCard);
      expect(analyticsService.track).toHaveBeenCalledWith('card.updated', expect.any(Object));
    });

    it('should return null when card not found', async () => {
      mockWhere.mockResolvedValueOnce([]);
      const card = await service.updateCard('nonexistent', { title: 'x' });
      expect(card).toBeNull();
    });
  });

  describe('deleteCard', () => {
    it('should delete a card and return true', async () => {
      const result = await service.deleteCard('test-uuid-123');
      expect(result).toBe(true);
      expect(analyticsService.track).toHaveBeenCalledWith('card.deleted', { id: 'test-uuid-123' });
    });

    it('should return false when card not found', async () => {
      mockWhere.mockResolvedValueOnce([]);
      const result = await service.deleteCard('nonexistent');
      expect(result).toBe(false);
    });
  });
});
