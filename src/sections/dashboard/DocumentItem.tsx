import { useState } from 'react';

// material ui
import {
  Button,
  ListItem,
  ListItemAvatar,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

// third-party
import { addDays, isAfter } from 'date-fns';

// project import
import DialogDeleteDocument from '@/views/drive/DialogDeleteDocument';
import useTimer from '@/hooks/useTimer';

// assets
import {
  InsertDriveFileOutlined,
  DeleteOutlineRounded,
  BusinessRounded,
  FolderOutlined,
  AccessTime
} from '@mui/icons-material';

// types
import { DocumentType } from '@/utils/types';

interface DocumentItemProps {
  document: DocumentType;
}

const DocumentItem = ({ document }: DocumentItemProps) => {
  const title = document.url.split('/')[2] as string;
  const daysAdded = addDays(document.createdAt, 7);
  const timer = useTimer(new Date(daysAdded).getTime());
  const now = Date.now();

  const [openDeleteDocument, setOpenDeleteDocument] = useState<boolean>(false);

  return (
    isAfter(daysAdded, now) && (
      <>
        <ListItem
          secondaryAction={
            <Stack direction="row" spacing={1.5}>
              <Tooltip title="Delete Auditor">
                <Button
                  size="small"
                  variant="text"
                  startIcon={<DeleteOutlineRounded />}
                  color="error"
                  onClick={() => setOpenDeleteDocument(true)}
                >
                  Delete
                </Button>
              </Tooltip>
            </Stack>
          }
        >
          <ListItemAvatar>
            <InsertDriveFileOutlined />
          </ListItemAvatar>
          <Stack direction="column">
            <Typography variant="body1">{title}</Typography>
            <Typography variant="caption" color="textSecondary">
              <Stack
                component="span"
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <BusinessRounded sx={{ fontSize: 16, pb: 0.3 }} />
                  {document.user?.name}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FolderOutlined sx={{ fontSize: 16, pb: 0.3 }} />
                  {document?.folder?.name}
                </Stack>
                {/* <Stack direction='row' alignItems='center' spacing={0.5}>
                <AccessTime sx={{ fontSize: 16, pb: 0.3 }} />
                {timer.days} Hari {timer.hours}:{timer.minutes}:{timer.seconds}
              </Stack> */}
              </Stack>
            </Typography>
          </Stack>
        </ListItem>

        <DialogDeleteDocument
          id={document.id}
          title={title}
          openDeleteDocument={openDeleteDocument}
          setOpenDeleteDocument={setOpenDeleteDocument}
        />
      </>
    )
  );
};

export default DocumentItem;
