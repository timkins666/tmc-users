import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateUserDialog } from '../../components/CreateUserDialog';
import dayjs from 'dayjs';

const mockProps = {
  open: true,
  onClose: jest.fn(),
  onCreateUser: jest.fn(),
};

describe('CreateUserDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields when open', () => {
    render(<CreateUserDialog {...mockProps} />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/date of birth/i)[0]).toBeInTheDocument();
  });

  test('calls onCreateUser with form data on submit', async () => {
    const user = userEvent.setup();
    render(<CreateUserDialog {...mockProps} />);

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getAllByLabelText(/date of birth/i)[0], '01/02/1993');

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockProps.onCreateUser).toHaveBeenCalledWith({
        firstname: 'John',
        lastname: 'Doe',
        dateOfBirth: dayjs('1993-02-01'),
      });
    });
  });

  test('calls onClose when cancel button is clicked', () => {
    render(<CreateUserDialog {...mockProps} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
