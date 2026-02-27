import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { getDb, schema } from '../db';
import { analyticsService } from '../analytics';
import type { Card, NewCard } from '../db/schema';

export interface CreateCardInput {
  title: string;
  description: string;
}

export interface UpdateCardInput {
  title?: string;
  description?: string;
}

export class CardService {
  async getAllCards(): Promise<Card[]> {
    const db = await getDb();
    const result = await db.select().from(schema.cards).orderBy(schema.cards.createdAt);
    analyticsService.track('cards.listed', { count: result.length });
    return result;
  }

  async getCardById(id: string): Promise<Card | null> {
    const db = await getDb();
    const result = await db.select().from(schema.cards).where(eq(schema.cards.id, id));
    if (result.length === 0) return null;
    analyticsService.track('card.viewed', { id });
    return result[0];
  }

  async createCard(input: CreateCardInput): Promise<Card> {
    const db = await getDb();
    const id = uuidv4();
    const newCard: NewCard = { id, ...input };
    await db.insert(schema.cards).values(newCard);
    const created = await this.getCardById(id);
    if (!created) throw new Error('Failed to retrieve created card');
    analyticsService.track('card.created', { id, title: input.title });
    return created;
  }

  async updateCard(id: string, input: UpdateCardInput): Promise<Card | null> {
    const db = await getDb();
    const existing = await this.getCardById(id);
    if (!existing) return null;
    await db.update(schema.cards).set(input).where(eq(schema.cards.id, id));
    const updated = await this.getCardById(id);
    analyticsService.track('card.updated', { id, fields: Object.keys(input) });
    return updated;
  }

  async deleteCard(id: string): Promise<boolean> {
    const db = await getDb();
    const existing = await this.getCardById(id);
    if (!existing) return false;
    await db.delete(schema.cards).where(eq(schema.cards.id, id));
    analyticsService.track('card.deleted', { id });
    return true;
  }
}

export const cardService = new CardService();
