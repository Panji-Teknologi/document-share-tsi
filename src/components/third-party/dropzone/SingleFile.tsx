import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Slide, Stack, SxProps, Typography, useTheme } from '@mui/material';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import MainCard from '@/components/MainCard';
import FolderSelect from '@/views/upload/FolderSelect';
import formatBytes from '@/utils/formatBytes';

import { openSnackbar } from '@/api/snackbar';
import { api } from '@/trpc/react';
import { format } from 'date-fns';

// assets
const pdf_logo = '/images/pdf-icon.png'
import { CloudUploadOutlined, FolderOffRounded } from '@mui/icons-material';

// types
import { FileWithPreview, FolderType } from '@/utils/types';
import useGetUser from '@/hooks/useGetUser';

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

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

interface SingleFileUploadProps {
  error: boolean | undefined;
  file: FileWithPreview[] | null;
  setFieldValue: any;
  sx?: SxProps
}

const SingleFileUpload = ({ error, file, setFieldValue, sx }: SingleFileUploadProps) => {
  const theme = useTheme();
  const user = useGetUser();

  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
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

        setFieldValue('files', [myRenamedFile])
      }
    }
  });

  const { data: folders } = api.folder.getNonRootByUserId.useQuery({ userId: user?.id ?? '' });
  const { data: root } = api.folder.getRootFolder.useQuery()
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
    },
    onError: (err) => {
      console.log('create document error : ', err)
    }
  });

  const rootFolder: FolderType | null | undefined = root

  const thumbs =
    file &&
    file.map((item, index) => (
      <Stack key={index} direction='row' mt={3} spacing={3} alignItems='center'>
        <img src={pdf_logo} height={100} />
        <Stack>
          <Typography variant='h5'>{item.name}</Typography>
          <Typography variant='caption' color='textSecondary'>{formatBytes(item.size)}</Typography>
        </Stack>
      </Stack>
    ));

  const onRemove = () => {
    setFieldValue('files', null);
    setSelectedFolder(null);
  };

  const onUpload = async () => {
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file[0] as File);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });

      mutateUpload({
        folderId: String(selectedFolder?.id),
        userId: String(user?.id),
        url: `/upload/${file[0]?.name}`
      });

      if (!res?.ok) throw new Error(await res.text());

      onRemove();
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
    <Box sx={{ width: '100%', ...sx }}>
      {file === null && (
        <DropzoneWrapper
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            }),
          }}
        >
          <input {...getInputProps()} />
          <PlaceholderContent />
        </DropzoneWrapper>
      )}

      {file !== null && (
        <DropzoneWrapper
          sx={{
            '&:hover': { opacity: 1, cursor: 'default' }
          }}
        >
          <Typography mb={3} variant='body1'>Pilih Folder</Typography>
          <Grid container spacing={2}>
            <Slide direction="up" in={true} timeout={50}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard
                  sx={{
                    borderRadius: 3,
                    backgroundColor: rootFolder?.id === selectedFolder?.id ? theme.palette.primary[100] : 'none',
                    ":hover": { cursor: 'pointer', backgroundColor: rootFolder?.id === selectedFolder?.id ? theme.palette.primary[200] : theme.palette.grey[100] }
                  }}
                  onClick={() => {
                    if (rootFolder) {
                      setSelectedFolder(rootFolder)
                    }
                  }}
                >
                  <Stack direction='row' alignItems='center' spacing={2}>
                    <FolderOffRounded color='secondary' fontSize='large' />
                    <Stack ml={2} direction='column'>
                      <Typography variant='subtitle1'>{rootFolder?.name}</Typography>
                      <Typography variant='caption' color='GrayText'>File akan disimpan tanpa Folder</Typography>
                    </Stack>
                  </Stack>
                </MainCard>
              </Grid>
            </Slide>
            {folders?.map((folder, index) => (
              <FolderSelect
                key={index}
                folder={folder}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
              />
            ))}
          </Grid>
        </DropzoneWrapper>
      )}

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {thumbs}

      {file && file.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Batal
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={selectedFolder === null}
            startIcon={<CloudUploadOutlined />}
            onClick={onUpload}
          >
            Upload
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default SingleFileUpload;
