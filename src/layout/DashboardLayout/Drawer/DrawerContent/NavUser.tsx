'use client';

import { use, useState } from 'react';

// next
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Theme } from '@mui/material';

// project import
import Avatar from '@/components/@extended/Avatar';
import useGetUser from '@/hooks/useGetUser';
import { useGetMenuMaster } from '@/api/menu';
import { api } from '@/trpc/react';

// assets
import { KeyboardArrowRight, AccountCircleOutlined } from '@mui/icons-material';

interface ExpandMoreProps {
  theme: Theme;
  expand: boolean;
  drawerOpen?: boolean;
}

const ExpandMore = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'theme' && prop !== 'expand' && prop !== 'drawerOpen' })(
  ({ theme, expand, drawerOpen }: ExpandMoreProps) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(-90deg)',
    marginLeft: 'auto',
    color: theme.palette.secondary.dark,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    ...(!drawerOpen && {
      opacity: 0,
      width: 50,
      height: 50
    })
  })
);

// ==============================|| DRAWER - USER ||============================== //

const NavUser = () => {
  const theme = useTheme();
  const router = useRouter();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const user = useGetUser();

  const handleLogout = () => {
    signOut();
    router.push('/')
  };

  const [anchorEl, setAnchorEl] = useState<null | any>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push('/profile')
    handleClose()
  }

  return (
    <Box sx={{ p: 1.25, px: !drawerOpen ? 1.25 : 3, borderTop: `2px solid ${theme.palette.divider}` }}>
      <List disablePadding>
        <ListItem
          disablePadding
          secondaryAction={
            <ExpandMore
              size="small"
              theme={theme}
              expand={open}
              drawerOpen={Boolean(drawerOpen)}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              aria-label="show more"
            >
              <KeyboardArrowRight style={{ fontSize: '0.625rem' }} />
            </ExpandMore>
          }
          sx={{ '& .MuiListItemSecondaryAction-root': { right: !drawerOpen ? -20 : -16 } }}
        >
          <ListItemAvatar>
            <Avatar alt="Avatar" sx={{ ...(drawerOpen && { width: 46, height: 46 }) }}>
              <AccountCircleOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user?.name} secondary={user?.role.name} />
        </ListItem>
      </List>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default NavUser;
