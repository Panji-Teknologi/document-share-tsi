// material-ui
import { Box, useMediaQuery, Theme, Chip } from '@mui/material';

// project import
import Search from './Search';
import Notification from './Notification';
import MobileSection from './MobileSection';

import useConfig from '@/hooks/useConfig';
import DrawerHeader from '@/layout/DashboardLayout/Drawer/DrawerHeader';

import { MenuOrientation } from '@/config';
import { api } from '@/trpc/react';
import useGetUser from '@/hooks/useGetUser';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const user = useGetUser()
  const { menuOrientation } = useConfig();

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      <Chip
        label={user?.role?.name}
        variant='outlined'
        size='small'
        sx={{ ml: 1.5 }}
        color={user?.role.id === 'auditor' ? 'info' : user?.role.id === 'client' ? 'warning' : 'success'}
      />
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
