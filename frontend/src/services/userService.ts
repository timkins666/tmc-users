import dayjs from 'dayjs';
import type { User, UserBase } from '../types/user';

const API_BASE = 'http://localhost:8000';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE}/users`);
    const users: User[] = await response.json();
    return users.map((user: User) => ({
      ...user,
      date_of_birth: dayjs(user.date_of_birth),
    }));
  },

  async createUser(userData: UserBase): Promise<User> {
    const response = await fetch(`${API_BASE}/users/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    await fetch(`${API_BASE}/user/${id}`, { method: 'DELETE' });
  },
};
