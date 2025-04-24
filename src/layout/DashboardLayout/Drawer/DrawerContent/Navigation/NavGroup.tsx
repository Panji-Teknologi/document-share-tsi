import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Divider,
  List,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import useGetUser from '@/hooks/useGetUser';

import { ThemeMode } from '@/config';
import { handlerHorizontalActiveItem, useGetMenuMaster } from '@/api/menu';

// types
import { MainMenu, MenuType, Submenu } from '@/menu-items';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

interface NavGroupProps {
  item: MenuType;
  lastItem: number | null;
  remItems: any;
  lastItemId: string;
  setSelectedItems: Dispatch<SetStateAction<string>>;
  selectedItems: string;
  setSelectedLevel: Dispatch<SetStateAction<number>>;
  selectedLevel: number;
};

const NavGroup = ({ item, lastItem, remItems, lastItemId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }: NavGroupProps) => {
  const theme = useTheme();
  const pathname = usePathname();
  const user = useGetUser()

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const role = user?.role.code as string; // client - surveyor - auditor

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentItem, setCurrentItem] = useState<MenuType>(item);

  const openMini = Boolean(anchorEl);

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem = { ...item };
        const elements = remItems.map((ele: MenuType) => ele?.children);
        localItem.children = elements.flat(1);
        setCurrentItem(localItem);
      } else {
        setCurrentItem(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, lastItem, downLG]);

  const checkOpenForParent = (child: Submenu[], id: string) => {
    child.forEach((ele) => {
      if (ele.url === pathname) {
        handlerHorizontalActiveItem(id);
      }
    });
  };

  const checkSelectedOnload = (data: MenuType) => {
    const childrens = data.children ? data.children : [];
    childrens.forEach((itemCheck) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id);
      }
      if (itemCheck?.url === pathname) {
        handlerHorizontalActiveItem(currentItem.id);
      }
    });
  };

  useEffect(() => {
    checkSelectedOnload(currentItem);
    if (openMini) setAnchorEl(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem]);


  const navCollapse = item.children?.filter((m) => (role === 'auditor' || role === 'surveyor' ? m.id !== 'upload' : m))?.map((menuItem: MainMenu) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id}
          />
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          <>
            {item.title ? (
              drawerOpen && (
                <Box sx={{ pl: 3, mb: 1.5 }}>
                  <Typography variant="subtitle2" color={theme.palette.mode === ThemeMode.DARK ? 'textSecondary' : 'text.secondary'}>
                    {item.title}
                  </Typography>
                </Box>
              )
            ) : (
              <Divider sx={{ my: 0.5 }} />
            )}
          </>
        }
        sx={{ mt: drawerOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
      >
        {navCollapse}
      </List>
    </>
  );
};
export default NavGroup;
