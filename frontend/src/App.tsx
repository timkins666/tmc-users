import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { type User } from './types/user';
import { useUsers } from './hooks/useUsers';
import {
  UserTable,
  type SortField,
  type SortOrder,
} from './components/UserTable';
import { CreateUserDialog } from './components/CreateUserDialog';
import { DeleteUserDialog } from './components/DeleteUserDialog';

function App() {
  const { users, createUser, deleteUser } = useUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [sortField, setSortField] = useState<SortField>('firstname');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    const newOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return aVal < bVal ? -modifier : aVal > bVal ? modifier : 0;
  });

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom>
        User Management
      </Typography>

      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={() => setShowCreateModal(true)}
        sx={{ mb: 3 }}
      >
        Create New User
      </Button>

      <UserTable
        users={sortedUsers}
        onDeleteUser={setUserToDelete}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <CreateUserDialog
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateUser={createUser}
      />

      <DeleteUserDialog
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default App;
