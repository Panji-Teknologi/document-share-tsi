import { useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material ui
import { Fade, Grid, Menu, MenuItem, Slide, Stack, Typography, useTheme } from '@mui/material';

// ÷third party
import { format } from 'date-fns'
import { id } from 'date-fns/locale/id'

// import project
import MainCard from '@/components/MainCard';
import IconButton from '@/components/@extended/IconButton';
import useGetUser from '@/hooks/useGetUser';

// assets
import { FolderRounded, MoreVert, DeleteOutlineRounded, CalendarTodayOutlined } from '@mui/icons-material';
import DialogDeleteFolder from './DialogDeleteFolder';

// type
import { FolderType } from '@/utils/types';

interface CardFolderProps {
  folder: FolderType
}

const CardFolder = ({ folder }: CardFolderProps) => {
  const theme = useTheme();
  const router = useRouter();
  const user = useGetUser();
  const role = user?.role.code as string; // client - surveyor - auditor

  const [anchorEl, setAnchorEl] = useState<null | any>(null);
  const [openDeleteFolder, setOpenDeleteFolder] = useState<boolean>(false);

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToFolder = () => {
    router.push(`/drive/${folder.id}/${folder.userId}`)
  }

  const handleOpenDeleteFolder = () => {
    setOpenDeleteFolder(true);
    handleMenuClose()
  }

  return (
    <Slide direction="up" in={true} timeout={50}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MainCard
          sx={{
            borderRadius: 3,
            ":hover": { cursor: 'pointer', backgroundColor: theme.palette.grey[100] }
          }}
        >
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' onClick={handleToFolder}>
              <FolderRounded color='secondary' fontSize='large' />
              <Stack ml={2} direction='column'>
                <Typography variant='subtitle1'>{folder.name}</Typography>
                <Typography variant='caption' color='GrayText'>{folder.user?.name}</Typography>
                <Stack direction='row' alignItems='center' spacing={0.3}>
                  <CalendarTodayOutlined sx={{ fontSize: 14, pb: 0.3 }} color='inherit' />
                  <Typography variant='caption' color='GrayText' sx={{ p: 0, fontSize: 12 }}>
                    {`${format(folder.startDate, 'dd MMM', { locale: id })} - ${format(folder.endDate, 'dd MMM yyyy', { locale: id })}`}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {role !== 'auditor' && (
              <IconButton color='primary' onClick={handleMenuClick}>
                <MoreVert color='secondary' />
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
              <MenuItem onClick={handleOpenDeleteFolder}>
                <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={1}>
                  <DeleteOutlineRounded color='secondary' />
                  <span>Delete</span>
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>
        </MainCard>

        <DialogDeleteFolder
          folder={folder}
          openDeleteFolder={openDeleteFolder}
          setOpenDeleteFolder={setOpenDeleteFolder}
        />
      </Grid>
    </Slide>
  )
}

export default CardFolder