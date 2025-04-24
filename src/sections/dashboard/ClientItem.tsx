import { useState } from 'react';

// material ui
import { Button, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';

// third-party
import { CopyToClipboard } from 'react-copy-to-clipboard';

// import project
import Avatar from '@/components/@extended/Avatar';
import DialogDetailClient from './dialog/DialogDetailClient';
import DialogDeleteUser from './dialog/DialogDeleteUser';
import { openSnackbar } from '@/api/snackbar';

// assets
import { DeleteOutlineRounded, BusinessRounded, InfoOutlined, EmailOutlined, ContentCopyOutlined } from '@mui/icons-material';
import { UserType } from '@/utils/types';

interface ClientItemProps {
  client: UserType,
}

const ClientItem = ({ client }: ClientItemProps) => {
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
  const [openDetailClient, setOpenDetailClient] = useState<boolean>(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction='row' spacing={1.5}>
            <Tooltip title='Info Detail'>
              <Button
                size='small'
                variant='text'
                startIcon={<InfoOutlined />}
                color='info'
                onClick={() => setOpenDetailClient(true)}
              >
                Detail
              </Button>
            </Tooltip>

            <Tooltip title='Delete Client'>
              <Button
                size='small'
                variant='text'
                startIcon={<DeleteOutlineRounded />}
                color='error'
                onClick={() => setOpenDeleteUser(true)}
              >
                Delete
              </Button>
            </Tooltip>
          </Stack>
        }
      >
        <ListItemAvatar>
          <Avatar alt="Avatar">
            <BusinessRounded />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={client.name} secondary={
          <Stack direction='row' alignItems='center' spacing={2}>
            <Stack direction='row' alignItems='center'>
              <Typography variant='caption'>{` ${client.folders?.length} Project(s)`}</Typography>
            </Stack>
            <CopyToClipboard
              text={`${client.hashedPassword}`}
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
              <Tooltip title={client.hashedPassword}>
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
              <Typography variant='caption'>{`${client.email}`}</Typography>
            </Stack>
          </Stack>
        } />
      </ListItem>

      <DialogDetailClient
        user={client}
        openDetailClient={openDetailClient}
        setOpenDetailClient={setOpenDetailClient}
      />

      <DialogDeleteUser
        user={client}
        openDeleteUser={openDeleteUser}
        setOpenDeleteUser={setOpenDeleteUser}
      />
    </>
  )
}

export default ClientItem