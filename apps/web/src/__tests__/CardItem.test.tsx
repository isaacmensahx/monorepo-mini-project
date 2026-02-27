import { render, screen, fireEvent } from '@testing-library/react';
import { CardItem } from '../components/CardItem';
import type { Card } from '../types';

// Mock MUI icons
jest.mock('@mui/icons-material/Edit', () => () => <span>EditIcon</span>);
jest.mock('@mui/icons-material/Delete', () => () => <span>DeleteIcon</span>);

const mockCard: Card = {
  id: 'test-id-123',
  title: 'Test Card Title',
  description: 'Test card description text',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
};

describe('CardItem', () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('renders card title and description', () => {
    render(<CardItem card={mockCard} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
    expect(screen.getByText('Test card description text')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<CardItem card={mockCard} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('edit-button'));
    expect(onEdit).toHaveBeenCalledWith(mockCard);
  });

  it('calls onDelete with card id when delete button is clicked', () => {
    render(<CardItem card={mockCard} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('delete-button'));
    expect(onDelete).toHaveBeenCalledWith('test-id-123');
  });
});
