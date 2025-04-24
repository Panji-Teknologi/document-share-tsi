import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

// material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, InputLabel, Stack, TextField } from '@mui/material';

// third-party
import { MobileDatePicker } from '@mui/x-date-pickers';

// import project
import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';
import useGetUser from '@/hooks/useGetUser';
import DateProvider from '@/components/DateProvider';

// assets
import { CalendarTodayOutlined } from '@mui/icons-material';

interface DialogCreateFolderProps {
  openCreateFolder: boolean;
  setOpenCreateFolder: Dispatch<SetStateAction<boolean>>
}

const DialogCreateFolder = ({ openCreateFolder, setOpenCreateFolder }: DialogCreateFolderProps) => {
  const user = useGetUser()
  const utils = api.useUtils()

  const [name, setName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(null);

  const { mutate: mutateProject } = api.project.createProject.useMutation()

  const { mutate: mutateCreateFolder } = api.folder.createFolder.useMutation({
    onSuccess: (data) => {
      openSnackbar({
        open: true,
        message: 'Successfully created new folder!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });

      mutateProject({ folderId: data.id });

      utils.folder.getNonRoot.invalidate()
      utils.folder.getNonRootByUserId.invalidate()
    },
  })

  const handleClose = () => {
    setOpenCreateFolder(false);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value)
  }

  const handleCreateFolder = async () => {
    if (user) {
      if (startDate !== null && startDate !== undefined && endDate !== null && endDate !== undefined) {
        mutateCreateFolder({
          name,
          userId: user?.id,
          isRoot: false,
          startDate: startDate,
          endDate: endDate,
        })
      }
    }
    handleClose();
  }

  return (
    <Dialog maxWidth='xs' open={openCreateFolder} onClose={handleClose}>
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Create new Folder to save your Document in one place
          </DialogContentText>

          <TextField id="name" placeholder="Folder Name" type="email" fullWidth variant="outlined" onChange={handleChange} />

          <DateProvider>
            <Stack spacing={1} direction='row'>
              <Box>
                <InputLabel>Start Date</InputLabel>
                <MobileDatePicker
                  value={startDate}
                  format="dd/MM/yyyy"
                  onChange={(date: Date | undefined | null) => setStartDate(date)}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: 'pointer' }}
                          >
                            <CalendarTodayOutlined />
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                />
              </Box>

              <Box>
                <InputLabel>End Date</InputLabel>
                <MobileDatePicker
                  value={endDate}
                  format="dd/MM/yyyy"
                  onChange={(date: Date | undefined | null) => setEndDate(date)}
                  slotProps={{
                    textField: {
                      InputProps: {
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ cursor: 'pointer' }}
                          >
                            <CalendarTodayOutlined />
                          </InputAdornment>
                        )
                      }
                    }
                  }}
                />
              </Box>
            </Stack>
          </DateProvider>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreateFolder}>
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DialogCreateFolder