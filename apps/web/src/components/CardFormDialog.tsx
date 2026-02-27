import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { appConfig } from '../config/app.config';
import type { Card, CreateCardPayload } from '../types';

interface CardFormDialogProps {
  open: boolean;
  card?: Card | null; // null = create mode, Card = edit mode
  onSubmit: (payload: CreateCardPayload) => Promise<void>;
  onClose: () => void;
}

export const CardFormDialog: React.FC<CardFormDialogProps> = ({
  open,
  card,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const isEditMode = Boolean(card);
  const { titleMaxLength, descriptionMaxLength } = appConfig.ui.cardConfig;

  useEffect(() => {
    if (open) {
      setTitle(card?.title ?? '');
      setDescription(card?.description ?? '');
      setErrors({});
    }
  }, [open, card]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (title.length > titleMaxLength) newErrors.title = `Title must be under ${titleMaxLength} characters`;
    if (!description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth data-testid="card-form-dialog">
      <DialogTitle>
        <Typography variant="h6" component="span" className="font-semibold">
          {isEditMode ? 'Edit Card' : 'Create New Card'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box className="flex flex-col gap-4 pt-2">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title ?? `${title.length}/${titleMaxLength}`}
            fullWidth
            autoFocus
            inputProps={{ maxLength: titleMaxLength }}
            data-testid="title-input"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={Boolean(errors.description)}
            helperText={errors.description ?? `${description.length}/${descriptionMaxLength}`}
            fullWidth
            multiline
            rows={4}
            inputProps={{ maxLength: descriptionMaxLength }}
            data-testid="description-input"
          />
        </Box>
      </DialogContent>

      <DialogActions className="px-6 pb-4 gap-2">
        <Button onClick={onClose} disabled={submitting} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          variant="contained"
          color="primary"
          data-testid="submit-button"
        >
          {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Card'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
