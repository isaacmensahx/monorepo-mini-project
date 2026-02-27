import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DeleteConfirmDialogProps {
  open: boolean;
  cardTitle?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  cardTitle,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth data-testid="delete-dialog">
      <DialogTitle className="flex items-center gap-2">
        <WarningAmberIcon color="warning" />
        <span>Delete Card?</span>
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete{' '}
          <strong>&quot;{cardTitle}&quot;</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions className="px-4 pb-4 gap-2">
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" data-testid="confirm-delete">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
