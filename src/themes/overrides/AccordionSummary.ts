// material-ui
import { Theme } from "@mui/material";

// assets
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

// ==============================|| OVERRIDES - ALERT TITLE ||============================== //

export default function AccordionSummary(theme: Theme) {
  const { palette, spacing } = theme;

  return {
    MuiAccordionSummary: {
      // defaultProps: {
      //   expandIcon: <ArrowForwardIosRoundedIcon style={{ fontSize: '0.75rem' }} />
      // },
      styleOverrides: {
        root: {
          backgroundColor: palette.secondary.lighter,
          flexDirection: 'row-reverse',
          minHeight: 46
        },
        expandIconWrapper: {
          '&.Mui-expanded': {
            transform: 'rotate(90deg)'
          }
        },
        content: {
          marginTop: spacing(1.25),
          marginBottom: spacing(1.25),
          marginLeft: spacing(1)
        }
      }
    }
  };
}
