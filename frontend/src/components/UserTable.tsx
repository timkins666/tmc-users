import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TableSortLabel } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { type User } from '../types/user'

export type SortField = keyof User
export type SortOrder = 'asc' | 'desc'

interface UserTableProps {
  users: User[]
  onDeleteUser: (user: User) => void
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
}

export const UserTable = ({ users, onDeleteUser, sortField, sortOrder, onSort }: UserTableProps) => {
  return (
    <TableContainer component={Paper}>
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
                active={sortField === 'date_of_birth'}
                direction={sortField === 'date_of_birth' ? sortOrder : 'asc'}
                onClick={() => onSort('date_of_birth')}
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
          {users.map(user => (
            <TableRow key={user.id} hover>
              <TableCell>{user.firstname}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.date_of_birth.format('DD/MM/YYYY')}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>
                <IconButton
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
  )
}
