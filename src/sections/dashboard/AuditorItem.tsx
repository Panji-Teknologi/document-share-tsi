import { useState } from 'react';

// material ui
import { Button, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import { CopyToClipboard } from 'react-copy-to-clipboard';

// import project
import Avatar from '@/components/@extended/Avatar';
import DialogDeleteUser from './dialog/DialogDeleteUser';
import DialogConnectProject from './dialog/DialogConnectProject';
import IconButton from '@/components/@extended/IconButton';
import { openSnackbar } from '@/api/snackbar';

// assets
import { DeleteOutlineRounded, SyncRounded, PeopleAltOutlined, EmailOutlined, ContentCopyOutlined } from '@mui/icons-material';

// types
import { UserType } from '@/utils/types';

interface AuditorItemProps {
  auditor: UserType,
}

const AuditorItem = ({ auditor }: AuditorItemProps) => {
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
  const [openConnectUser, setOpenConnectUser] = useState<boolean>(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction='row' spacing={1.5}>
            <Tooltip title='Connect with Project'>
              <IconButton
                color='success'
                onClick={() => setOpenConnectUser(true)}
              >
                <SyncRounded />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Auditor'>
              <IconButton
                color='error'
                onClick={() => setOpenDeleteUser(true)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      >
        <ListItemAvatar>
          <Avatar alt="Avatar" />
        </ListItemAvatar>
        <ListItemText primary={auditor.name} secondary={
          <Stack direction='row' alignItems='center' spacing={2}>
            <Stack direction='row' alignItems='center'>
              <PeopleAltOutlined sx={{ fontSize: 16, pb: 0.3 }} />
              <Typography variant='caption'>{` ${auditor.projects?.length} Clients`}</Typography>
            </Stack>
            <CopyToClipboard
              text={`${auditor.hashedPassword}`}
              onCopy={() =>
                openSnackbar({
                  open: true,
                  message: 'Password Copied',
                  variant: 'alert',

                  alert: {
                    color: 'success'
                  },

                  anchorOrigin: { vertical: 'top', horizontal: 'center' },
                })
              }>
              <Tooltip title={auditor.hashedPassword}>
                <Button
                  variant='text'
                  color='secondary'
                  size='small'
                  startIcon={<ContentCopyOutlined sx={{ fontSize: 16, pb: 0.3 }} />}
                >
                  Copy Password
                </Button>
              </Tooltip>
            </CopyToClipboard>
            <Stack direction='row' alignItems='center'>
              <EmailOutlined sx={{ fontSize: 16, pb: 0.3 }} />
              <Typography variant='caption'>{`${auditor.email}`}</Typography>
            </Stack>
          </Stack>
        } />
      </ListItem>

      <DialogConnectProject
        user={auditor}
        openConnectUser={openConnectUser}
        setOpenConnectUser={setOpenConnectUser}
      />

      <DialogDeleteUser
        user={auditor}
        openDeleteUser={openDeleteUser}
        setOpenDeleteUser={setOpenDeleteUser}
      />
    </>
  )
}

export default AuditorItem