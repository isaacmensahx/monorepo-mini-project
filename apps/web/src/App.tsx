import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { CardGrid } from './components/CardGrid';
import { CardFormDialog } from './components/CardFormDialog';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import { useCards } from './hooks/useCards';
import { appConfig } from './config/app.config';
import type { Card, CreateCardPayload } from './types';

// Config-driven MUI theme
const theme = createTheme({
  palette: {
    mode: appConfig.theme.mode,
    primary: {
      main: appConfig.theme.primaryColor,
    },
  },
  shape: {
    borderRadius: appConfig.theme.borderRadius * 4,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  const { cards, loading, createCard, updateCard, deleteCard } = useCards();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  const deletingCard = cards.find((c) => c.id === deletingCardId);

  const handleCreate = () => {
    setEditingCard(null);
    setFormOpen(true);
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setFormOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    if (appConfig.ui.confirmDeleteDialog) {
      setDeletingCardId(id);
    } else {
      deleteCard(id);
    }
  };

  const handleFormSubmit = async (payload: CreateCardPayload) => {
    if (editingCard) {
      await updateCard(editingCard.id, payload);
    } else {
      await createCard(payload);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingCardId) {
      await deleteCard(deletingCardId);
      setDeletingCardId(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50">
        <Header cardCount={cards.length} onCreateClick={handleCreate} />

        <Container maxWidth="xl" className="py-8">
          <Box className="mb-6">
            <Typography variant="body1" color="text.secondary">
              {appConfig.pageConfig.subtitle}
            </Typography>
          </Box>

          <CardGrid
            cards={cards}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        </Container>

        {/* Card Form Dialog - Create / Edit */}
        <CardFormDialog
          open={formOpen}
          card={editingCard}
          onSubmit={handleFormSubmit}
          onClose={() => setFormOpen(false)}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={Boolean(deletingCardId)}
          cardTitle={deletingCard?.title}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingCardId(null)}
        />

        <Toaster
          position="bottom-right"
          toastOptions={{ duration: appConfig.ui.toastDuration }}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
