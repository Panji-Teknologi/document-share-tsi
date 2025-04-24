// material-ui
import { Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

// ==============================|| OVERRIDES - DIALOG CONTENT TEXT ||============================== //

export default function Popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: `0px 1px 4px ${alpha(`${theme.palette.grey[900]}`, 0.08)}`
        }
      }
    }
  };
}
