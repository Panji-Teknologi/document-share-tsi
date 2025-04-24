import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

// material ui
import { styled } from '@mui/material/styles';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material';

// third-party
import { useDropzone } from "react-dropzone";

// import project
import PlaceholderContent from '@/components/third-party/dropzone/PlaceholderContent';
import formatBytes from '@/utils/formatBytes';

import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';

// types
import { FolderType, UserType } from '@/utils/types';

// assets
const pdf_logo = '/images/pdf-icon.png'

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

interface DialogAddDocumentProps {
  openAddDocument: boolean;
  setOpenAddDocument: Dispatch<SetStateAction<boolean>>
}

const DialogAddDocument = ({ openAddDocument, setOpenAddDocument }: DialogAddDocumentProps) => {
  const utils = api.useUtils()

  const [user, setUser] = useState<UserType | null>(null);
  const [folder, setFolder] = useState<FolderType | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: clients } = api.user.getClients.useQuery();
  const { data: folders } = api.folder.getFolderByUserId.useQuery({ userId: String(user?.id) });

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'application/pdf': []
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];

      if (uploadedFile) {
        const fileName = uploadedFile.name.replace(/.pdf/g, '');
        const date = new Date();
        const myRenamedFile = new File([uploadedFile], `${fileName}-${date.getTime()}.pdf`);

        setFile(myRenamedFile);
      }
    }
  });

  const { mutate: mutateUpload } = api.document.documentUpload.useMutation({
    onSuccess: () => {
      openSnackbar({
        open: true,
        message: 'Upload success!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      utils.document.getAll.invalidate();
      utils.folder.getAll.invalidate();
    },
    onError: (err) => {
      console.log('create document error : ', err)
    }
  });

  const handleClose = () => {
    setOpenAddDocument(false);
    setFile(undefined);
    setFolder(null);
    setUser(null);
  }

  const handleAddDocument = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.set('file', file as File);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        mutateUpload({
          folderId: String(folder?.id),
          userId: String(user?.id),
          url: `/upload/${file?.name}`
        });

        handleClose();
        setLoading(false);
      } else {
        openSnackbar({
          open: true,
          message: "Upload Document Failed!",
          variant: 'alert',
          alert: {
            color: 'error'
          }
        });
        setLoading(false);
      }
    } catch (error: any) {
      // console.log('Error upload : ', error);
      openSnackbar({
        open: true,
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });
      setLoading(false);
    }
  }

  return (
    <Dialog maxWidth='sm' fullWidth open={openAddDocument}>
      <DialogTitle>Add Document</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {clients && (
              <Autocomplete
                fullWidth
                options={clients}
                getOptionLabel={(option) => String(option?.name)}
                renderInput={(params) => <TextField {...params} placeholder="Select User" />}
                onChange={(event: any, newValue: UserType | null) => {
                  setUser(newValue);
                }}
                sx={{
                  mt: 2
                }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {folders && (
              <Autocomplete
                fullWidth
                options={folders}
                getOptionLabel={(option) => String(option?.name)}
                renderInput={(params) => <TextField {...params} placeholder="Select Folder" />}
                onChange={(event: any, newValue: FolderType | null) => {
                  setFolder(newValue);
                }}
                sx={{
                  mt: 2
                }}
              />
            )}
          </Grid>
        </Grid>

        <Box mt={3}>
          {file === undefined ? (
            <DropzoneWrapper
              {...getRootProps()}
              sx={{
                ...(isDragActive && { opacity: 0.72 }),
                ...((isDragReject) && {
                  color: 'error.main',
                  borderColor: 'error.light',
                  bgcolor: 'error.lighter'
                }),
              }}
            >
              <input {...getInputProps()} />
              <PlaceholderContent />
            </DropzoneWrapper>
          ) : (
            <Stack direction='row' alignItems='center'>
              <img src={pdf_logo} height={100} />
              <Stack>
                <Typography variant='h5'>{file.name}</Typography>
                <Typography variant='caption' color='textSecondary'>{formatBytes(file.size)}</Typography>
              </Stack>
            </Stack>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={loading ? "outlined" : "contained"}
          disabled={!user || !folder || file === undefined || loading}
          onClick={handleAddDocument}
        >
          {loading ? "Uploading..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddDocument