'use client';

import { useState } from 'react';

// material ui
import {
  Fade,
  Grid,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

// third party
import { addDays, isAfter } from 'date-fns';

// import project
import MainCard from '@/components/MainCard';
import IconButton from '@/components/@extended/IconButton';
import truncateString from '@/utils/truncateStr';
import useGetUser from '@/hooks/useGetUser';
// import useTimer from '@/hooks/useTimer';

// assets
const pdf_logo = '/images/pdf-icon.png';
import { MoreVert, DeleteOutlineRounded } from '@mui/icons-material';

// project import
import DialogDeleteDocument from '@/views/drive/DialogDeleteDocument';
import DialogOpenDocument from '@/views/drive/DialogOpenDocument';

// types
import { DocumentType } from '@/utils/types';

interface CardFileProps {
  document: DocumentType;
}

const CardFile = ({ document }: CardFileProps) => {
  const theme = useTheme();
  const user = useGetUser();
  const title = document.url.split('/')[2] as string;
  const role = user?.role.code as string; // client - surveyor - auditor

  const daysAdded = addDays(document.createdAt, 7);
  // const timer = useTimer(new Date(daysAdded).getTime());
  const now = Date.now();

  const [openDocument, setOpenDocument] = useState<boolean>(false);
  const [openDeleteDocument, setOpenDeleteDocument] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | any>(null);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDocument = () => {
    setOpenDocument(true);
  };

  const handleOpenDeleteFile = () => {
    setOpenDeleteDocument(true);
    handleMenuClose();
  };

  return (
    isAfter(daysAdded, now) && (
      <Slide direction="up" in={true} timeout={50}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MainCard
            sx={{
              borderRadius: 3,
              ':hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.grey[100]
              }
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Tooltip title={title}>
                <Stack direction="row" onClick={handleOpenDocument}>
                  <img src={pdf_logo} height={50} />
                  <Stack ml={2} direction="column">
                    <Typography variant="subtitle1">
                      {truncateString(title, 25)}
                    </Typography>
                    <Typography variant="caption" color="GrayText">
                      {document.user?.name}
                    </Typography>
                    {/* <Typography variant='caption' color='GrayText'>
                    {timer.days} Hari {timer.hours}:{timer.minutes}:{timer.seconds}
                  </Typography> */}
                  </Stack>
                </Stack>
              </Tooltip>

              {role !== 'auditor' && (
                <IconButton color="primary" onClick={handleMenuClick}>
                  <MoreVert color="secondary" />
                </IconButton>
              )}
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={handleOpenDeleteFile}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={1}
                  >
                    <DeleteOutlineRounded color="secondary" />
                    <span>Delete</span>
                  </Stack>
                </MenuItem>
              </Menu>
            </Stack>
          </MainCard>

          <DialogDeleteDocument
            id={document.id}
            title={title}
            openDeleteDocument={openDeleteDocument}
            setOpenDeleteDocument={setOpenDeleteDocument}
          />
          <DialogOpenDocument
            document={document}
            openDocument={openDocument}
            setOpenDocument={setOpenDocument}
          />
        </Grid>
      </Slide>
    )
  );
};

export default CardFile;
