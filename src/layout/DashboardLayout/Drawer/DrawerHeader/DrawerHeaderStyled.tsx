// material-ui
import { styled } from '@mui/material/styles';
import { Box, Theme } from '@mui/material';

// ==============================|| DRAWER HEADER - STYLED ||============================== //

interface DrawerHeaderStyledProps {
  theme: Theme;
  open: boolean;
}

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: DrawerHeaderStyledProps) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 3 : 0)
}));

export default DrawerHeaderStyled;
