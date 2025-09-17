import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { Cake, Delete } from '@mui/icons-material';
import { type User } from '../types/user';
import dayjs from 'dayjs';

export type SortField = keyof User;
export type SortOrder = 'asc' | 'desc';

interface UserTableProps {
  users: User[];
  onDeleteUser: (user: User) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  searchText: string;
}

export const UserTable = ({
  users,
  onDeleteUser,
  sortField,
  sortOrder,
  onSort,
  searchText,
}: UserTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, mb: 2, maxHeight: 'calc(100vh - 350px)' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortField === 'firstname'}
                direction={sortField === 'firstname' ? sortOrder : 'asc'}
                onClick={() => onSort('firstname')}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'lastname'}
                direction={sortField === 'lastname' ? sortOrder : 'asc'}
                onClick={() => onSort('lastname')}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'dateOfBirth'}
                direction={sortField === 'dateOfBirth' ? sortOrder : 'asc'}
                onClick={() => onSort('dateOfBirth')}
              >
                Date of Birth
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'age'}
                direction={sortField === 'age' ? sortOrder : 'asc'}
                onClick={() => onSort('age')}
              >
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .filter(
              (user) =>
                user.firstname.toLowerCase().includes(searchText) ||
                user.lastname.toLowerCase().includes(searchText)
            )
            .map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  '& .delete-icon': { opacity: 0 },
                  '&:hover .delete-icon': { opacity: 1 },
                }}
              >
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.dateOfBirth.format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  {dayjs().diff(user.dateOfBirth, 'year')}{' '}
                  {user.dateOfBirth.date() === dayjs().date() &&
                  user.dateOfBirth.month() === dayjs().month() ? (
                    <Cake
                      sx={{ color: 'primary.main', verticalAlign: 'sub' }}
                    />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    className='delete-icon'
                    onClick={() => onDeleteUser(user)}
                    sx={{ '&:hover': { color: 'error.main' } }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
