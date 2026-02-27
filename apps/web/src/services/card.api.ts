import axios from 'axios';
import { appConfig } from '../config/app.config';
import type { Card, CreateCardPayload, UpdateCardPayload, ApiResponse } from '../types';

const apiClient = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: appConfig.api.timeout,
  headers: { 'Content-Type': 'application/json' },
});

export const cardApi = {
  getAll: async (): Promise<Card[]> => {
    const { data } = await apiClient.get<ApiResponse<Card[]>>('/cards');
    return data.data ?? [];
  },

  getById: async (id: string): Promise<Card> => {
    const { data } = await apiClient.get<ApiResponse<Card>>(`/cards/${id}`);
    if (!data.data) throw new Error('Card not found');
    return data.data;
  },

  create: async (payload: CreateCardPayload): Promise<Card> => {
    const { data } = await apiClient.post<ApiResponse<Card>>('/cards', payload);
    if (!data.data) throw new Error('Failed to create card');
    return data.data;
  },

  update: async (id: string, payload: UpdateCardPayload): Promise<Card> => {
    const { data } = await apiClient.put<ApiResponse<Card>>(`/cards/${id}`, payload);
    if (!data.data) throw new Error('Failed to update card');
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/cards/${id}`);
  },
};
