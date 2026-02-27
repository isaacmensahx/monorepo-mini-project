import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { appConfig } from '../config/app.config';
import type { Card } from '../types';

interface CardItemProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (id: string) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
  const { showTimestamps, showCardId } = appConfig.ui.cardConfig;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <MuiCard
      className="animate-slide-up h-full flex flex-col transition-shadow hover:shadow-lg"
      elevation={2}
      data-testid="card-item"
    >
      <CardContent className="flex-1">
        <Typography
          variant="h6"
          component="h2"
          className="font-semibold text-gray-800 mb-2 line-clamp-2"
          gutterBottom
        >
          {card.title}
        </Typography>

        <Typography
          variant="body2"
          className="text-gray-600 leading-relaxed"
          color="text.secondary"
        >
          {card.description}
        </Typography>

        {showCardId && (
          <Chip label={`ID: ${card.id.slice(0, 8)}...`} size="small" className="mt-2" />
        )}
      </CardContent>

      <CardActions className="justify-between px-4 pb-3">
        {showTimestamps && (
          <Typography variant="caption" color="text.secondary" className="text-xs">
            {formatDate(card.updatedAt)}
          </Typography>
        )}

        <div className="ml-auto flex gap-1">
          <Tooltip title="Edit card">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit(card)}
              aria-label={`Edit card: ${card.title}`}
              data-testid="edit-button"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete card">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(card.id)}
              aria-label={`Delete card: ${card.title}`}
              data-testid="delete-button"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </CardActions>
    </MuiCard>
  );
};
