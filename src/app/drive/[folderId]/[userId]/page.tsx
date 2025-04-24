'use client'

import { useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material'

// import project
import CardFile from '@/components/cards/CardFile'
import useGetUser from '@/hooks/useGetUser';
import DialogUploadDocument from '@/views/drive/DialogUploadDocument';

import { api } from '@/trpc/react'

// assets
import { ArrowBackIos, FileUploadOutlined, FolderRounded } from '@mui/icons-material';

const FolderDetail = ({ params }: { params: { folderId: string, userId: string } }) => {
  const router = useRouter();
  const user = useGetUser();
  const role = user?.role.code as string; // client - surveyor - auditor

  console.log('params : ', params)

  const [openUploadDocument, setOpenUploadDocument] = useState<boolean>(false);

  const { data: documents } = api.document.getDocuments.useQuery({ folderId: params.folderId });
  const { data: documentsByUserId } = api.document.getDocumentsByUserId.useQuery({ folderId: params.folderId, userId: params.userId });
  const { data: folder } = api.folder.getFolderById.useQuery({ id: params.folderId })

  console.log('documents : ', documents)


  const handleBack = () => {
    router.push('/drive')
  }

  const handleUploadDocument = () => {
    setOpenUploadDocument(true);
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        {/* <Stack spacing={3} direction='row' alignItems='center'> */}
        <Button startIcon={<ArrowBackIos />} onClick={handleBack}>
          Back
        </Button>

        {folder && (
          <Stack direction='row' spacing={1} alignItems='center'>
            <FolderRounded color='secondary' fontSize='medium' />
            <Typography variant='h5'>{folder[0]?.name}</Typography>
          </Stack>
        )}
        {/* </Stack> */}

        {role !== 'auditor' && (
          <Button variant='contained' startIcon={<FileUploadOutlined />} onClick={handleUploadDocument}>
            Upload Document
          </Button>
        )}
      </Stack>

      {/* ================================= | FILE - Lembaga Sertifikasi | ================================= */}
      {role === 'surveyor' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>File</Typography>
          <Grid container spacing={2}>
            {documents?.map((document, index) => {
              return (
                <CardFile key={index} document={document} />
              )
            })}
          </Grid>
        </Box>
      )}

      {/* ================================= | FILE - Client | ================================= */}
      {role === 'client' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>File</Typography>
          <Grid container spacing={2}>
            {documents?.map((document, index) => {
              return (
                <CardFile key={index} document={document} />
              )
            })}
          </Grid>
        </Box>
      )}

      {/* ================================= | FILE - AUDITOR | ================================= */}
      {role === 'auditor' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>File</Typography>
          <Grid container spacing={2}>
            {documentsByUserId?.map((document, index) => {
              return (
                <CardFile key={index} document={document} />
              )
            })}
          </Grid>
        </Box>
      )}

      <DialogUploadDocument
        folderId={params.folderId}
        openUploadDocument={openUploadDocument}
        setOpenUploadDocument={setOpenUploadDocument}
      />
    </Box>
  )
}

export default FolderDetail