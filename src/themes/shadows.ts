// material-ui
import { alpha } from '@mui/material/styles';
import { Theme } from '@mui/material';

// project-imports
import { ThemeMode } from '@/config';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

const CustomShadows = (mode: 'light' | 'dark', theme: Theme) => ({
  button: theme.palette.mode === ThemeMode.DARK ? `0 2px 0 rgb(0 0 0 / 5%)` : `0 2px #0000000b`,
  text: `0 -1px 0 rgb(0 0 0 / 12%)`,
  z1:
    mode === ThemeMode.DARK
      ? `0px 1px 1px rgb(0 0 0 / 14%), 0px 2px 1px rgb(0 0 0 / 12%), 0px 1px 3px rgb(0 0 0 / 20%)`
      : `0px 1px 4px ${alpha(theme.palette.grey[900] as string, 0.08)}`,
  primary: `0 0 0 2px ${alpha(theme.palette.primary.main as string, 0.2)}`,
  secondary: `0 0 0 2px ${alpha(theme.palette.secondary.main as string, 0.2)}`,
  error: `0 0 0 2px ${alpha(theme.palette.error.main as string, 0.2)}`,
  warning: `0 0 0 2px ${alpha(theme.palette.warning.main as string, 0.2)}`,
  info: `0 0 0 2px ${alpha(theme.palette.info.main as string, 0.2)}`,
  success: `0 0 0 2px ${alpha(theme.palette.success.main as string, 0.2)}`,
  grey: `0 0 0 2px ${alpha(theme.palette.grey[500] as string, 0.2)}`,
  primaryButton: `0 14px 12px ${alpha(theme.palette.primary.main as string, 0.2)}`,
  secondaryButton: `0 14px 12px ${alpha(theme.palette.secondary.main as string, 0.2)}`,
  errorButton: `0 14px 12px ${alpha(theme.palette.error.main as string, 0.2)}`,
  warningButton: `0 14px 12px ${alpha(theme.palette.warning.main as string, 0.2)}`,
  infoButton: `0 14px 12px ${alpha(theme.palette.info.main as string, 0.2)}`,
  successButton: `0 14px 12px ${alpha(theme.palette.success.main as string, 0.2)}`,
  greyButton: `0 14px 12px ${alpha(theme.palette.grey[500] as string, 0.2)}`
});

export default CustomShadows;
