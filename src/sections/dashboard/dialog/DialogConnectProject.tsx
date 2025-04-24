import React, { Dispatch, SetStateAction, useState } from 'react'

// material ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material'

// import project
import { api } from '@/trpc/react';
import { UserType } from '@/utils/types';
import { openSnackbar } from '@/api/snackbar';

// assets
import { SyncRounded } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

interface DialogConnectProjectProps {
  user: UserType;
  openConnectUser: boolean;
  setOpenConnectUser: Dispatch<SetStateAction<boolean>>;
}

const DialogConnectProject = ({ user, openConnectUser, setOpenConnectUser }: DialogConnectProjectProps) => {
  const utils = api.useUtils();
  const projectIds = user.projects?.map((project) => project.folderId);

  const [userId, setUserId] = useState<string>('')
  const [folderId, setFolderId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { data: clients } = api.user.getClients.useQuery();
  const { data: folders } = api.folder.getNonRootByUserId.useQuery({ userId });
  const { data: project } = api.project.getProject.useQuery({ folderId });

  const { mutate: mutateConnectProject, error } = api.user.connectWithProject.useMutation({
    onSuccess: () => {
      openSnackbar({
        open: true,
        message: `success connecting project`,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });

      utils.user.getAuditors.invalidate();
      utils.project.getProject.invalidate();

      handleClose()
      setLoading(false);
    },
    onError: () => {
      openSnackbar({
        open: true,
        message: error?.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      });

      setLoading(false);
    }
  })

  const handleClose = () => {
    setOpenConnectUser(false);
    setUserId('');
    setFolderId('');
  }

  const handleChangeUserId = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;

    setUserId(value);
  }

  const handleChangeFolder = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;

    setFolderId(value);
  }

  const handleConnectUser = () => {
    setLoading(true);

    if (project) {
      mutateConnectProject({ id: user.id, projectId: project[0]?.id as string })
    }
  }

  return (
    <Dialog maxWidth='xs' fullWidth open={openConnectUser}>
      <DialogTitle>Connect Auditor with Client</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="multiple-name-label">Select Clients</InputLabel>
          <Select
            labelId="multiple-name-label"
            id="multiple-name"
            value={userId}
            onChange={handleChangeUserId}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
          >
            {clients?.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="multiple-name-label">Select Project</InputLabel>
          <Select
            labelId="multiple-name-label"
            id="multiple-name"
            value={folderId}
            onChange={handleChangeFolder}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
          >
            {folders?.filter((item) => !projectIds?.includes(item.id))?.map((folder) => (
              <MenuItem key={folder.id} value={folder.id}>
                {folder.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" startIcon={<SyncRounded />} disabled={loading} onClick={handleConnectUser}>
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConnectProject