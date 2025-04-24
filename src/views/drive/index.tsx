'use client';

import { useState } from 'react';

// material ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// assets
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { api } from '@/trpc/react';

import DialogCreateFolder from './DialogCreateFolder';
import CardFolder from './CardFolder';
import CardFile from '@/components/cards/CardFile';
import useGetUser from '@/hooks/useGetUser';
import { UserType } from '@/utils/types';

const Drive = () => {
  const user = useGetUser();
  const role = user?.role.code as string; // client - surveyor - auditor

  const [client, setClient] = useState<UserType | null>(null);
  const [openCreateFolder, setOpenCreateFolder] = useState<boolean>(false);

  const userId = role === 'auditor' ? client?.id ?? '' : user?.id ?? '';
  const folderIds = user?.projects?.map((project) => project.folderId) as string[]

  const { data: documents } = api.document.getDocumentsRoot.useQuery();
  const { data: documentsByUserId } = api.document.getDocumentsRootByUserId.useQuery({ userId });
  const { data: folders } = api.folder.getNonRoot.useQuery();
  const { data: foldersByUserId } = api.folder.getNonRootByUserId.useQuery({ userId });
  const { data: projects } = api.folder.getFoldersByIds.useQuery({ folderIds });

  const handleOpenCreateFolder = () => setOpenCreateFolder(true);

  return (
    <Box>
      {/* row 1 */}
      <Box>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant="h5">Drive</Typography>

          <Stack direction='row' alignItems='center' spacing={2}>
            {/* {role === 'auditor' && (
              <Autocomplete
                fullWidth
                options={projects}
                getOptionLabel={(option) => String(option?.name)}
                renderInput={(params) => <TextField {...params} placeholder="Select Client" size='small' fullWidth />}
                onChange={(event: any, newValue: UserType | null) => {
                  setClient(newValue);
                }}
                sx={{ width: 300, bgcolor: 'white' }}
              />
            )} */}

            {role !== 'auditor' && (
              <Button
                variant='contained'
                size='small'
                startIcon={<AddCircleOutlineRounded />}
                onClick={handleOpenCreateFolder}>
                Create Folder
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* ================================= | FILE | ================================= */}
      {role === 'surveyor' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>File</Typography>
          {documents?.length === 0 ? (
            <Stack justifyContent='center' alignItems='center' p={5}>
              <Typography variant="subtitle2">No Documents</Typography>
            </Stack>
          ) : (
            <Grid container spacing={2}>
              {documents?.map((document, index) => {
                return (
                  <CardFile key={index} document={document} />
                )
              })}
            </Grid>
          )}
        </Box>
      )}

      {role === 'client' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>File</Typography>
          {documentsByUserId?.length === 0 ? (
            <Stack justifyContent='center' alignItems='center' p={5}>
              <Typography variant="subtitle2">No Documents</Typography>
            </Stack>
          ) : (
            <Grid container spacing={2}>
              {documentsByUserId?.map((document, index) => {
                return (
                  <CardFile key={index} document={document} />
                )
              })}
            </Grid>
          )}
        </Box>
      )}

      {/* row 2 */}
      {/* ================================= | FOLDER | ================================= */}
      {role === 'surveyor' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>Folder</Typography>
          {folders?.length === 0 ? (
            <Stack justifyContent='center' alignItems='center' p={5}>
              <Typography variant="subtitle2">No Folders</Typography>
            </Stack>
          ) : (
            <Grid container spacing={2}>
              {folders?.map((folder, index) => (
                <CardFolder key={index} folder={folder} />
              ))}
            </Grid>
          )}
        </Box>
      )}

      {role === 'client' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>Folder</Typography>
          {foldersByUserId?.length === 0 ? (
            <Stack justifyContent='center' alignItems='center' p={5}>
              <Typography variant="subtitle2">No Folders</Typography>
            </Stack>
          ) : (
            <Grid container spacing={2}>
              {foldersByUserId?.map((folder, index) => (
                <CardFolder key={index} folder={folder} />
              ))}
            </Grid>
          )}
        </Box>
      )}

      {role === 'auditor' && (
        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>Folder</Typography>
          {projects?.length === 0 ? (
            <Stack justifyContent='center' alignItems='center' p={5}>
              <Typography variant="subtitle2">No Folders</Typography>
            </Stack>
          ) : (
            <Grid container spacing={2}>
              {projects?.map((project, index) => (
                <CardFolder key={index} folder={project} />
              ))}
            </Grid>
          )}
        </Box>
      )}

      <DialogCreateFolder openCreateFolder={openCreateFolder} setOpenCreateFolder={setOpenCreateFolder} />
    </Box>
  )
}

export default Drive