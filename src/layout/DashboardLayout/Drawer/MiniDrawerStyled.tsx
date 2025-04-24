// material-ui
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material';
import Drawer from '@mui/material/Drawer';

// project import
import { DRAWER_WIDTH, ThemeMode } from '@/config';

const openedMixin = (theme: Theme) => ({
  width: DRAWER_WIDTH,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  boxShadow: theme.palette.mode === ThemeMode.DARK ? theme.customShadows?.z1 : 'none',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  width: theme.spacing(7.5),
  borderRight: 'none',
  boxShadow: theme.customShadows?.z1
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

interface MiniDrawerStyledProps {
  theme: Theme;
  open: boolean;
}

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: MiniDrawerStyledProps) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    overflowX: 'hidden',
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    overflowX: 'hidden',
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export default MiniDrawerStyled;
