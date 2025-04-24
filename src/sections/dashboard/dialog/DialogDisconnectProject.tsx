import { Dispatch, SetStateAction, useState } from 'react'

// material ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme } from '@mui/material'

// import project
import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';

// types
import { UserType } from '@/utils/types'

// assets
import { SyncDisabledRounded } from '@mui/icons-material';

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

interface DialogDisconnectProjectProps {
  auditors: UserType[] | undefined;
  projectId: string;
  openDisconnectUser: boolean;
  setOpenDisconnectUser: Dispatch<SetStateAction<boolean>>;
}

const DialogDisconnectProject = ({ auditors, projectId, openDisconnectUser, setOpenDisconnectUser }: DialogDisconnectProjectProps) => {
  const utils = api.useUtils()

  const [auditorId, setAuditorId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mutateDisconnectProject, error } = api.user.disconnectWithProject.useMutation({
    onSuccess: () => {
      openSnackbar({
        open: true,
        message: `success disconnecting project`,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });

      utils.project.getProject.invalidate();
      utils.user.getAuditors.invalidate();

      setLoading(false);
      handleClose()
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
    setOpenDisconnectUser(false);
    setAuditorId('');
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;

    setAuditorId(value);
  }

  const handleConnectUser = () => {
    const idAuditor = auditors?.find((auditor) => auditor.id === auditorId)?.id as string
    setLoading(true);

    mutateDisconnectProject({ id: idAuditor, projectId })
  }

  return (
    <Dialog maxWidth='xs' fullWidth open={openDisconnectUser}>
      <DialogTitle>Disconnect Auditor with Project</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="multiple-name-label">Select Auditor</InputLabel>
          <Select
            labelId="multiple-name-label"
            id="multiple-name"
            value={auditorId}
            onChange={handleChange}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
          >
            {auditors?.map((auditor) => (
              <MenuItem key={auditor.id} value={auditor.id}>
                {auditor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button variant="contained" startIcon={<SyncDisabledRounded />} disabled={loading} onClick={handleConnectUser}>
          Disconnect
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDisconnectProject