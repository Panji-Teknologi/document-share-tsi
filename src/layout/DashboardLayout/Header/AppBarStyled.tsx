// material-ui
import { styled } from '@mui/material/styles';
import { AppBar, Theme } from '@mui/material';

// project import
import { DRAWER_WIDTH } from '@/config';

// ==============================|| HEADER - APP BAR STYLED ||============================== //

interface AppBarStyledProps {
  theme: Theme
  open: boolean
}

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: AppBarStyledProps) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7.5)})`
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default AppBarStyled;
