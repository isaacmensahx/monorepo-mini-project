import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { cardApi } from '../services/card.api';
import { analytics } from '../analytics';
import type { Card, CreateCardPayload, UpdateCardPayload } from '../types';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cardApi.getAll();
      setCards(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load cards';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    analytics.track('page_viewed');
    fetchCards();
  }, [fetchCards]);

  const createCard = useCallback(async (payload: CreateCardPayload): Promise<Card | null> => {
    analytics.track('card_create_initiated');
    try {
      const card = await cardApi.create(payload);
      setCards((prev) => [card, ...prev]);
      analytics.track('card_created', { id: card.id });
      toast.success('Card created successfully!');
      return card;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create card';
      toast.error(message);
      return null;
    }
  }, []);

  const updateCard = useCallback(
    async (id: string, payload: UpdateCardPayload): Promise<Card | null> => {
      analytics.track('card_edit_initiated', { id });
      try {
        const updated = await cardApi.update(id, payload);
        setCards((prev) => prev.map((c) => (c.id === id ? updated : c)));
        analytics.track('card_updated', { id });
        toast.success('Card updated successfully!');
        return updated;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update card';
        toast.error(message);
        return null;
      }
    },
    []
  );

  const deleteCard = useCallback(async (id: string): Promise<boolean> => {
    analytics.track('card_delete_initiated', { id });
    try {
      await cardApi.delete(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
      analytics.track('card_deleted', { id });
      toast.success('Card deleted.');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete card';
      toast.error(message);
      return false;
    }
  }, []);

  return { cards, loading, error, createCard, updateCard, deleteCard, refetch: fetchCards };
};
