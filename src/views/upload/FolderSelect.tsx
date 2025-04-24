import { Dispatch, SetStateAction } from 'react';

// material ui
import { Grid, Slide, Stack, Typography, useTheme } from '@mui/material'

// third party
import { format } from 'date-fns'

// import project
import MainCard from '@/components/MainCard'

// assets
import { FolderRounded } from '@mui/icons-material';

// type
import { FolderType } from '@/utils/types';

interface FolderSelectProps {
  folder: FolderType
  selectedFolder: FolderType | null;
  setSelectedFolder: Dispatch<SetStateAction<FolderType | null>>
}

const FolderSelect = ({ folder, selectedFolder, setSelectedFolder }: FolderSelectProps) => {
  const theme = useTheme();

  return (
    <Slide direction="up" in={true} timeout={50}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MainCard
          sx={{
            borderRadius: 3,
            backgroundColor: folder.id === selectedFolder?.id ? theme.palette.primary[100] : 'none',
            ":hover": { cursor: 'pointer', backgroundColor: folder.id === selectedFolder?.id ? theme.palette.primary[200] : theme.palette.grey[100] }
          }}
          onClick={() => setSelectedFolder(folder)}
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <FolderRounded color='secondary' fontSize='large' />
            <Stack ml={2} direction='column'>
              <Typography variant='subtitle1'>{folder.name}</Typography>
              <Typography variant='caption' color='GrayText'>{format(folder.createdAt, 'dd MMM yyyy HH:mm')}</Typography>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>
    </Slide>
  )
}

export default FolderSelect