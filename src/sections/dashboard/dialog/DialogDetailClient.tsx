'use client'

import { Dispatch, SetStateAction } from 'react';

// material ui
import { Dialog, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// project import
import MainCard from '@/components/MainCard'
import ProjectItem from "./components/ProjectItem"
import { api } from '@/trpc/react'

// assets
import { BusinessRounded } from '@mui/icons-material';

// types
import { ProjectType, UserType } from '@/utils/types';

interface DialogDetailClientProps {
  user: UserType;
  openDetailClient: boolean;
  setOpenDetailClient: Dispatch<SetStateAction<boolean>>
}

const DialogDetailClient = ({ user, openDetailClient, setOpenDetailClient }: DialogDetailClientProps) => {

  const handleClose = () => {
    setOpenDetailClient(false);
  }

  return (
    <>
      <Dialog maxWidth='md' fullWidth open={openDetailClient} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          <Stack spacing={1} direction='row' alignItems='center'>
            <BusinessRounded />
            <Typography variant='h4'>{user.name}</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <MainCard content={false}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textTransform: 'capitalize' }}>Project / Folder</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>Time Frame</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>Auditors</TableCell>
                    <TableCell align='right' sx={{ textTransform: 'capitalize' }}>Connect with Auditor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user?.folders?.map((folder) => {
                    return (
                      <ProjectItem key={folder.id} folder={folder} />
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogDetailClient