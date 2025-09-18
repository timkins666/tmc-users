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
import { type NewUser, validateNewUser } from '../types/user';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { MIN_USER_AGE } from '../types/constants';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateUser: (userData: NewUser) => Promise<boolean>;
}

export const CreateUserDialog = ({
  open,
  onClose,
  onCreateUser,
}: CreateUserDialogProps) => {
  const [formData, setFormData] = useState<NewUser>({
    firstname: '',
    lastname: '',
    dateOfBirth: null,
  });

  const [dateError, setDateError] = useState<string | null>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNewUser(formData)) {
      return;
    }

    if (!await onCreateUser(formData)) {
      return; // invalid or failed request
    }
    setFormData({ firstname: '', lastname: '', dateOfBirth: null });
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
              value={formData.dateOfBirth}
              maxDate={dayjs().subtract(MIN_USER_AGE, 'year')}
              onChange={(newValue) =>
                setFormData({ ...formData, dateOfBirth: newValue })
              }
              onError={(newError) =>
                setDateError(
                  newError === 'maxDate' ? `Users must be over ${MIN_USER_AGE}` : ''
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
          <Button type='submit' variant='contained' disabled={!validateNewUser(formData)}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
