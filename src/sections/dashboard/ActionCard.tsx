'use client'

// material ui
import { Stack, Typography, useTheme } from '@mui/material';

// import project
import MainCard from '@/components/MainCard';

// assets
import { CreateNewFolderOutlined, PersonAddAltOutlined, AddHomeWorkOutlined, NoteAddOutlined } from '@mui/icons-material';
import { Dispatch, SetStateAction } from 'react';

interface ActionCardProps {
  title: string;
  origin: string;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const ActionCard = ({ title, origin, setOpenDialog }: ActionCardProps) => {
  const theme = useTheme();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  return (
    <MainCard
      contentSX={{ p: 2.25 }}
      onClick={handleOpenDialog}
      sx={{
        ":hover":
          { cursor: 'pointer', backgroundColor: theme.palette.grey[100] }
      }}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        {origin === 'auditor' && <PersonAddAltOutlined fontSize='small' color='error' />}
        {origin === 'client' && <AddHomeWorkOutlined fontSize='small' color='success' />}
        {origin === 'document' && <NoteAddOutlined fontSize='small' color='warning' />}
        {origin === 'folder' && <CreateNewFolderOutlined fontSize='small' color='primary' />}
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Stack>
    </MainCard>
  )
}

export default ActionCard