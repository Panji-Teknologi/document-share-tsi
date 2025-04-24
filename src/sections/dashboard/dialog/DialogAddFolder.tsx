import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

// material ui
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, InputLabel, Stack, TextField } from '@mui/material';

// third-party
import { MobileDatePicker } from '@mui/x-date-pickers';

// import project
import { api } from '@/trpc/react';
import { openSnackbar } from '@/api/snackbar';
import DateProvider from "@/components/DateProvider"

// assets
import { CalendarTodayOutlined } from '@mui/icons-material';

// types
import { UserType } from '@/utils/types';

interface DialogAddFolderProps {
  openAddFolder: boolean;
  setOpenAddFolder: Dispatch<SetStateAction<boolean>>
}

const DialogAddFolder = ({ openAddFolder, setOpenAddFolder }: DialogAddFolderProps) => {
  const utils = api.useUtils();

  const [name, setName] = useState<string>('');
  const [user, setUser] = useState<UserType | null>(null);
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | null | undefined>(null);

  const { data: clients } = api.user.getClients.useQuery();

  const { mutate: mutateProject } = api.project.createProject.useMutation()

  const { mutate: mutateAddFolder } = api.folder.createFolder.useMutation({
    onSuccess: (data) => {
      openSnackbar({
        open: true,
        message: 'Successfully add new folder!',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });

      mutateProject({ folderId: data.id });

      utils.folder.getAll.invalidate();
      utils.document.getAll.invalidate();
      utils.user.getClients.invalidate();
      utils.user.getAuditors.invalidate();
    },
  })

  const handleClose = () => {
    setOpenAddFolder(false);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value)
  }

  const handleAddFolder = async () => {
    if (user) {
      if (startDate !== null && startDate !== undefined && endDate !== null && endDate !== undefined) {
        mutateAddFolder({
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
    <Dialog maxWidth='xs' open={openAddFolder}>
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>Add Folder</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Add new Folder to save your Document in one place
          </DialogContentText>

          <TextField id="name" placeholder="Folder Name" type="email" fullWidth variant="outlined" onChange={handleChange} />

          {clients && (
            <Autocomplete
              fullWidth
              options={clients}
              getOptionLabel={(option) => String(option?.name)}
              renderInput={(params) => <TextField {...params} placeholder="Select User" />}
              onChange={(event: any, newValue: UserType | null) => {
                setUser(newValue);
              }}
              sx={{
                my: 2
              }}
            />
          )}

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
          <Button variant="contained" onClick={handleAddFolder}>
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DialogAddFolder