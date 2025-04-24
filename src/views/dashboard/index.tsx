'use client';

import { useState } from 'react';

// material ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// import project
import ActionCard from '@/sections/dashboard/ActionCard';
import AuditorList from '@/sections/dashboard/AuditorList';
import ClientList from '@/sections/dashboard/ClientList';
import FolderList from '@/sections/dashboard/FolderList';
import DocumentList from '@/sections/dashboard/DocumentList';
import DialogAddUser from '@/sections/dashboard/dialog/DialogAddUser';
import DialogAddFolder from '@/sections/dashboard/dialog/DialogAddFolder';
import DialogAddDocument from '@/sections/dashboard/dialog/DialogAddDocument';

import { api } from '@/trpc/react';

const Dashboard = () => {
  const [openAddAuditor, setOpenAddAuditor] = useState<boolean>(false);
  const [openAddClient, setOpenAddClient] = useState<boolean>(false);
  const [openAddFolder, setOpenAddFolder] = useState<boolean>(false);
  const [openAddDocument, setOpenAddDocument] = useState<boolean>(false);

  const { data: roles } = api.role.getRoles.useQuery();

  return (
    <>
      <Box>
        {/* row 1 */}
        <Stack>
          <Typography variant="h5">Dashboard</Typography>
        </Stack>

        <Box mt={4}>
          <Typography variant="subtitle1" mb={1}>Actions</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ActionCard
                title="Add Auditor"
                origin='auditor'
                setOpenDialog={setOpenAddAuditor}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ActionCard
                title="Add Client"
                origin='client'
                setOpenDialog={setOpenAddClient}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ActionCard
                title="Add Folder"
                origin='folder'
                setOpenDialog={setOpenAddFolder}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ActionCard
                title="Add Document"
                origin='document'
                setOpenDialog={setOpenAddDocument}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <AuditorList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ClientList />
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FolderList />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DocumentList />
            </Grid>
          </Grid>
        </Box>
      </Box >

      <DialogAddUser
        roles={roles}
        title='Create Auditor Account'
        role='auditor'
        openAddUser={openAddAuditor}
        setOpenAddUser={setOpenAddAuditor}
      />

      <DialogAddUser
        roles={roles}
        title='Create Client Account'
        role='client'
        openAddUser={openAddClient}
        setOpenAddUser={setOpenAddClient}
      />

      <DialogAddFolder
        openAddFolder={openAddFolder}
        setOpenAddFolder={setOpenAddFolder}
      />

      <DialogAddDocument
        openAddDocument={openAddDocument}
        setOpenAddDocument={setOpenAddDocument}
      />
    </>
  )
}

export default Dashboard