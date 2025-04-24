import { useEffect } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project import
import Dot from '@/components/@extended/Dot';
import useConfig from '@/hooks/useConfig';

import { MenuOrientation, ThemeMode } from '@/config';
import { handlerActiveItem, handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';
import { MainMenu } from '@/menu-items';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

interface NavItemProps {
  item?: MainMenu;
  level?: number;
  isParents?: boolean;
};

const NavItem = ({ item, level, isParents = false }: NavItemProps) => {
  const theme = useTheme();
  const router = useRouter()

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;
  const openItem = menuMaster?.openedItem;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();

  const Icon = item?.icon as any;
  const itemIcon = item?.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem',
        ...(menuOrientation === MenuOrientation.HORIZONTAL && isParents && { fontSize: 20, stroke: '1.5' })
      }}
    />
  ) : (
    false
  );



  const pathname = usePathname();
  const isSelected = openItem === item?.id;

  // active menu item on page load
  useEffect(() => {
    if (pathname === item?.url) handlerActiveItem(item.id);
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'primary.main';

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ListItemButton
          onClick={() => router.push(String(item?.url))}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            pl: drawerOpen ? `${Number(level) * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              '&:hover': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
              },
              '&.Mui-selected': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                '&:hover': {
                  color: iconSelectedColor,
                  bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
                }
              }
            }),
            ...(!drawerOpen && {
              '&:hover': {
                bgcolor: 'transparent'
              },
              '&.Mui-selected': {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                bgcolor: 'transparent'
              }
            })
          }}
          {...(downLG && {
            onClick: () => {
              handlerDrawerOpen(false)
              router.push(String(item?.url))
            }
          })}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter'
                  }
                }),
                ...(!drawerOpen &&
                  isSelected && {
                  bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.900' : 'primary.lighter',
                  '&:hover': {
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.darker' : 'primary.lighter'
                  }
                })
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                  {item?.title}
                </Typography>
              }
            />
          )}
        </ListItemButton>
      </Box>
    </>
  );
};

export default NavItem;
