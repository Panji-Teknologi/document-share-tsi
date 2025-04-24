import { Dispatch, SetStateAction, useState } from "react";

// material ui
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";

// third-party
import { useDropzone } from "react-dropzone";

// import project
import PlaceholderContent from "@/components/third-party/dropzone/PlaceholderContent";
import formatBytes from "@/utils/formatBytes";
import useGetUser from "@/hooks/useGetUser";

import { api } from "@/trpc/react";
import { openSnackbar } from "@/api/snackbar";

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

interface DialogUploadDocumentProps {
  folderId: string;
  openUploadDocument: boolean;
  setOpenUploadDocument: Dispatch<SetStateAction<boolean>>
}

const DialogUploadDocument = ({ folderId, openUploadDocument, setOpenUploadDocument }: DialogUploadDocumentProps) => {
  const user = useGetUser();
  const utils = api.useUtils()

  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

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
      utils.document.getDocuments.invalidate();
      utils.document.getDocumentsRoot.invalidate();
      utils.document.getDocumentsRootByUserId.invalidate();
    },
    onError: (err) => {
      console.log('create document error : ', err)
    }
  });

  const handleClose = () => {
    setOpenUploadDocument(false);
    setFile(undefined);
  }

  const handleUploadDocument = async () => {
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
          folderId: String(folderId),
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
      console.log('Error upload : ', error);
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
    <Dialog maxWidth='xs' fullWidth open={openUploadDocument} onClose={handleClose}>
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>Upload Document in this Folder</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={loading ? "outlined" : "contained"} disabled={file === undefined || loading} onClick={handleUploadDocument}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DialogUploadDocument