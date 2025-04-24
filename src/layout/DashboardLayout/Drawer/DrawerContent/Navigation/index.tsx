import { useLayoutEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';

// project import
// import NavItem from './NavItem';
import NavGroup from './NavGroup';
import menuItem, { MenuType } from '@/menu-items';
import useConfig from '@/hooks/useConfig';
import useGetUser from '@/hooks/useGetUser';

import { HORIZONTAL_MAX_ITEM } from '@/config';
import { useGetMenuMaster } from '@/api/menu';
import { MenuOrientation } from '@/config';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const user = useGetUser();
  const role = user?.role.code as string; // client - surveyor - auditor

  const theme = useTheme();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [menuItems, setMenuItems] = useState<{ items: MenuType[] }>({ items: [] });

  useLayoutEffect(() => {
    const noAdminMenu = menuItem.items?.filter((item) => item.id !== 'group-dashboard');

    if (role !== 'surveyor') {
      setMenuItems({ items: noAdminMenu })
    } else {
      setMenuItems(menuItem);
    }

  }, [menuItem, role]);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: MenuType[] = [];
  let lastItemId: string;

  //  first it checks menu item is more than giving HORIZONTAL_MAX_ITEM after that get lastItemid by giving horizontal max
  // item and it sets horizontal menu by giving horizontal max item lastly slice menuItem from array and set into remItems

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1]?.id as string;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      ...item,
      title: item.title,
      children: item.children,
    }));
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        // if (item.id !== lastItemId) {
        //   return (
        //     <List key={item.id} {...(isHorizontal && { sx: { mt: 0.5 } })}>
        //       {!isHorizontal && index !== 0 && <Divider sx={{ my: 0.5 }} />}
        //       <NavItem item={item} level={1} isParents />
        //     </List>
        //   );
        // }

        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        ...(!isHorizontal && {
          '& > ul:first-of-type': { mt: 0 }
        }),
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block'
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
