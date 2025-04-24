import { useState } from 'react';

// material ui
import { Button, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';

// ÷third party
import { format } from 'date-fns'
import { id } from 'date-fns/locale/id'

// project import
import DialogDeleteFolder from '@/views/drive/DialogDeleteFolder';

// assets
import { FolderOpenRounded, DeleteOutlineRounded, BusinessRounded, DescriptionOutlined, CalendarTodayOutlined } from '@mui/icons-material';

// types
import { FolderType } from '@/utils/types';

interface FolderItemProps {
  folder: FolderType,
}

const FolderItem = ({ folder }: FolderItemProps) => {
  const [openDeleteFolder, setOpenDeleteFolder] = useState<boolean>(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction='row' spacing={1.5}>
            <Tooltip title='Delete Auditor'>
              <Button
                size='small'
                variant='text'
                startIcon={<DeleteOutlineRounded />}
                color='error'
                onClick={() => setOpenDeleteFolder(true)}
              >
                Delete
              </Button>
            </Tooltip>
          </Stack>
        }>
        <ListItemAvatar>
          <FolderOpenRounded />
        </ListItemAvatar>
        <Stack direction='column'>
          <Typography variant='body1'>
            {folder.name}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            <Stack component='span' direction='row' alignItems='center' spacing={2}>
              <Stack direction='row' alignItems='center' spacing={0.5}>
                <BusinessRounded sx={{ fontSize: 16, pb: 0.3 }} />
                {folder.user?.name}
              </Stack>
              <Stack direction='row' alignItems='center' spacing={0.5}>
                <DescriptionOutlined sx={{ fontSize: 16, pb: 0.3 }} />
                {folder.documents?.length} Documents
              </Stack>
              <Stack direction='row' alignItems='center' spacing={0.5}>
                <CalendarTodayOutlined sx={{ fontSize: 16, pb: 0.3 }} />
                {`${format(folder.startDate, 'dd MMM', { locale: id })} - ${format(folder.endDate, 'dd MMM yyyy', { locale: id })}`}
              </Stack>
            </Stack>
          </Typography>
        </Stack>
      </ListItem>

      <DialogDeleteFolder
        folder={folder}
        openDeleteFolder={openDeleteFolder}
        setOpenDeleteFolder={setOpenDeleteFolder}
      />
    </>
  )
}

export default FolderItem