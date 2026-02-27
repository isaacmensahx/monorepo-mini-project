import React from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { CardItem } from './CardItem';
import { appConfig } from '../config/app.config';
import type { Card } from '../types';

interface CardGridProps {
  cards: Card[];
  loading: boolean;
  onEdit: (card: Card) => void;
  onDelete: (id: string) => void;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, loading, onEdit, onDelete }) => {
  const { cardsPerRow } = appConfig.ui;
  const { emptyStateMessage } = appConfig.pageConfig;

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-24" data-testid="loading-spinner">
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (cards.length === 0) {
    return (
      <Box
        className="flex flex-col items-center justify-center py-24 text-gray-400"
        data-testid="empty-state"
      >
        <InboxIcon sx={{ fontSize: 64 }} className="mb-4 opacity-40" />
        <Typography variant="h6" color="text.secondary">
          {emptyStateMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} className="animate-fade-in">
      {cards.map((card) => (
        <Grid
          key={card.id}
          item
          xs={12 / cardsPerRow.xs}
          sm={12 / cardsPerRow.sm}
          md={12 / cardsPerRow.md}
          lg={12 / cardsPerRow.lg}
        >
          <CardItem card={card} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};
