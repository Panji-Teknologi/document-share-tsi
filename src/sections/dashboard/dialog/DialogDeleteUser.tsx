import { Dispatch, SetStateAction } from 'react';

// material ui
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// assets
import { DeleteOutlineRounded } from '@mui/icons-material';
import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';

// types
import { UserType } from '@/utils/types';

interface DialogDeleteUserProps {
  user: UserType;
  openDeleteUser: boolean;
  setOpenDeleteUser: Dispatch<SetStateAction<boolean>>
}

const DialogDeleteUser = ({ user, openDeleteUser, setOpenDeleteUser }: DialogDeleteUserProps) => {
  const utils = api.useUtils()

  const { mutate: mutateDeleteUser } = api.user.deleteUser.useMutation({
    onSuccess: () => {
      openSnackbar({
        open: true,
        message: 'Successfully deleted folder!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      utils.user.getAuditors.invalidate()
      utils.user.getClients.invalidate()
      utils.folder.getAll.invalidate()
      utils.document.getAll.invalidate()
    }
  })

  const handleClose = () => {
    setOpenDeleteUser(false);
  }

  const handleDeleteUser = async () => {
    mutateDeleteUser({ id: user.id });
    handleClose()
  }

  return (
    <Dialog maxWidth='xs' fullWidth open={openDeleteUser} onClose={handleClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Are you sure wan to delete <b>{user.name}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" startIcon={<DeleteOutlineRounded />} onClick={handleDeleteUser}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteUser