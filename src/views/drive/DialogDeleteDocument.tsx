import { Dispatch, SetStateAction } from 'react';

// material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

// import project
import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';

// assets
import { DeleteOutlineRounded } from '@mui/icons-material';

interface DialogCreateDocumentProps {
  id: string;
  title: string;
  openDeleteDocument: boolean;
  setOpenDeleteDocument: Dispatch<SetStateAction<boolean>>
}

const DialogDeleteDocument = ({ id, title, openDeleteDocument, setOpenDeleteDocument }: DialogCreateDocumentProps) => {
  const utils = api.useUtils()

  const { mutate: mutateDeleteDocument } = api.document.deleteDocument.useMutation({
    onSuccess: () => {
      openSnackbar({
        open: true,
        message: 'Successfully deleted Document!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      utils.document.getAll.invalidate()
      utils.document.getDocumentsRoot.invalidate()
      utils.document.getDocuments.invalidate()
      utils.document.getDocumentsRootByUserId.invalidate()
      utils.folder.getAll.invalidate()
    }
  })

  const handleClose = () => {
    setOpenDeleteDocument(false);
  }

  const handleDeleteDocument = async () => {
    try {
      const res = await fetch(`/api/upload?name=${title}`, {
        method: 'DELETE'
      });

      if (!res?.ok) throw new Error(await res.text());

      mutateDeleteDocument({ documentId: id })
      handleClose()
    } catch (error: any) {
      console.log('Error upload : ', error);
      openSnackbar({
        open: true,
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
    }
  }

  return (
    <Dialog maxWidth='xs' open={openDeleteDocument} onClose={handleClose}>
      <Box sx={{ p: 1, py: 1.5, minWidth: 250 }}>
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure want to delete <b><i>{title}</i></b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" startIcon={<DeleteOutlineRounded />} onClick={handleDeleteDocument}>
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DialogDeleteDocument