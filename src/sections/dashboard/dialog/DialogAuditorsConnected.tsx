import { Dispatch, SetStateAction } from 'react';

// material ui
import { Dialog, DialogContent, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'

// p[roject iomport
import Avatar from '@/components/@extended/Avatar'
import MainCard from '@/components/MainCard'

// assets
import { AccountCircleOutlined } from '@mui/icons-material';

// types
import { ProjectType } from '@/utils/types'

interface DialogAuditorsConnectedProps {
  project: ProjectType | undefined;
  openAuditorsConnected: boolean;
  setOpenAuditorsConnected: Dispatch<SetStateAction<boolean>>
}

const DialogAuditorsConnected = ({ project, openAuditorsConnected, setOpenAuditorsConnected }: DialogAuditorsConnectedProps) => {

  const handleClose = () => {
    setOpenAuditorsConnected(false)
  }

  return (
    <Dialog
      maxWidth='sm'
      open={openAuditorsConnected}
      onClose={handleClose}
    >
      <DialogContent>
        <MainCard
          elevation={0}
          border={false}
          content={false}
        >
          <List
            component="nav"
            sx={{ p: 0 }}
          >
            {project?.auditors?.map((auditor) => (
              <ListItemButton key={auditor.id}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'success.main',
                      bgcolor: 'success.lighter'
                    }}
                  >
                    <AccountCircleOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {auditor.name}
                    </Typography>
                  }
                  secondary={auditor.email}
                />
              </ListItemButton>
            ))}
          </List>
        </MainCard>
      </DialogContent>
    </Dialog>
  )
}

export default DialogAuditorsConnected