import { Dispatch, SetStateAction } from 'react';

// material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

// assets
import { DeleteOutlineRounded } from '@mui/icons-material';
import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';

// types
import { FolderType } from '@/utils/types';

interface DialogDeleteFolderProps {
  folder: FolderType
  openDeleteFolder: boolean;
  setOpenDeleteFolder: Dispatch<SetStateAction<boolean>>
}

const DialogDeleteFolder = ({ folder, openDeleteFolder, setOpenDeleteFolder }: DialogDeleteFolderProps) => {
  const utils = api.useUtils()

  const { mutate: mutateDeleteFolder } = api.folder.deleteFolder.useMutation({
    onSuccess: () => {
      openSnackbar({
        open: true,
        message: 'Successfully deleted folder!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      utils.folder.getAll.invalidate()
      utils.folder.getNonRoot.invalidate()
      utils.folder.getNonRootByUserId.invalidate()
      utils.user.getClients.invalidate();
    }
  })

  const handleClose = () => {
    setOpenDeleteFolder(false);
  }

  const handleDeleteFolder = async () => {
    mutateDeleteFolder({ id: folder.id });
    handleClose()
  }

  return (
    <Dialog maxWidth='xs' open={openDeleteFolder} onClose={handleClose}>
      <Box sx={{ p: 1, py: 1.5, width: 250 }}>
        <DialogTitle>Delete Folder</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<DeleteOutlineRounded />} onClick={handleDeleteFolder}>
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DialogDeleteFolder