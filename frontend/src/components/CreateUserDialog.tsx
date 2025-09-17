import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { type NewUser, type UserBase } from '../types/user';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateUser: (userData: UserBase) => void;
}

export const CreateUserDialog = ({
  open,
  onClose,
  onCreateUser,
}: CreateUserDialogProps) => {
  const [formData, setFormData] = useState<NewUser>({
    firstname: '',
    lastname: '',
    date_of_birth: null,
  });

  const [dateError, setDateError] = useState<string | null>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser(formData);
    setFormData({ firstname: '', lastname: '', date_of_birth: null });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label='First name'
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            fullWidth
            label='Last name'
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: '100%' }}
              label='Date of birth'
              format='DD/MM/YYYY'
              value={formData.date_of_birth}
              disableFuture
              onChange={(newValue) =>
                setFormData({ ...formData, date_of_birth: newValue })
              }
              onError={(newError) =>
                setDateError(
                  newError === 'disableFuture' ? 'Future dates not allowed' : ''
                )
              }
              slotProps={{
                textField: {
                  required: true,
                  error: false,
                  InputLabelProps: { shrink: true },
                  helperText: dateError,
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit' variant='contained'>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
