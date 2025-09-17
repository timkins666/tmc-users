import dayjs from 'dayjs';
import { userService } from '../../services/userService';

// Mock fetch
global.fetch = jest.fn();

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUsers fetches users from API', async () => {
    const mockUsers = [
      {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        date_of_birth: '1990-01-01',
        age: 34,
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });

    const result = await userService.getUsers();

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/users');
    expect(result).toEqual([
      { ...mockUsers[0], date_of_birth: dayjs('1990-01-01') },
    ]);
  });

  test('createUser posts user data to API', async () => {
    const userData = {
      firstname: 'John',
      lastname: 'Doe',
      date_of_birth: '1990-01-01',
    };
    const mockResponse = { id: '1', ...userData, age: 34 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });

    const result = await userService.createUser(userData);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });
    expect(result).toEqual(mockResponse);
  });

  test('deleteUser sends DELETE request', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({});

    await userService.deleteUser('1');

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/user/1', {
      method: 'DELETE',
    });
  });
});
