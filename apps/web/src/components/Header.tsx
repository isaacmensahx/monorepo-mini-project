import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StyleIcon from '@mui/icons-material/Style';
import { appConfig } from '../config/app.config';

interface HeaderProps {
  cardCount: number;
  onCreateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cardCount, onCreateClick }) => {
  const { title } = appConfig.pageConfig;

  return (
    <AppBar position="sticky" elevation={1} className="bg-white" sx={{ bgcolor: 'white' }}>
      <Toolbar className="justify-between">
        <Box className="flex items-center gap-2">
          <StyleIcon color="primary" />
          <Typography variant="h6" component="h1" color="primary" className="font-bold">
            {title}
          </Typography>
          {cardCount > 0 && (
            <Typography variant="caption" color="text.secondary" className="ml-1">
              ({cardCount} card{cardCount !== 1 ? 's' : ''})
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateClick}
          data-testid="create-card-btn"
          className="font-semibold"
        >
          New Card
        </Button>
      </Toolbar>
    </AppBar>
  );
};
