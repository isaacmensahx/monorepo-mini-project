import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CardFormDialog } from '../components/CardFormDialog';

describe('CardFormDialog', () => {
  const onSubmit = jest.fn().mockResolvedValue(undefined);
  const onClose = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('renders create mode when no card provided', () => {
    render(<CardFormDialog open={true} card={null} onSubmit={onSubmit} onClose={onClose} />);
    expect(screen.getByText('Create New Card')).toBeInTheDocument();
    expect(screen.getByText('Create Card')).toBeInTheDocument();
  });

  it('renders edit mode when card is provided', () => {
    const card = {
      id: '1',
      title: 'Existing Title',
      description: 'Existing Desc',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    render(<CardFormDialog open={true} card={card} onSubmit={onSubmit} onClose={onClose} />);
    expect(screen.getByText('Edit Card')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Title')).toBeInTheDocument();
  });

  it('shows validation error when title is empty', async () => {
    render(<CardFormDialog open={true} card={null} onSubmit={onSubmit} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<CardFormDialog open={true} card={null} onSubmit={onSubmit} onClose={onClose} />);

    fireEvent.change(screen.getByTestId('title-input').querySelector('input')!, {
      target: { value: 'New Title' },
    });
    fireEvent.change(screen.getByTestId('description-input').querySelector('textarea')!, {
      target: { value: 'New Description' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'New Title',
        description: 'New Description',
      });
    });
  });

  it('calls onClose when cancel is clicked', () => {
    render(<CardFormDialog open={true} card={null} onSubmit={onSubmit} onClose={onClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});
