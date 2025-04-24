import "@mui/material/styles"

interface PaletteColor {
  light?: string;
  lighter?: string;
  main?: string;
  dark?: string;
  darker?: string;
  contrastText?: string;
  0?: string;
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  A50?: string;
  A100?: string;
  A200?: string;
  A300?: string;
  A400?: string;
  A500?: string;
  A600?: string;
  A700?: string;
  A800?: string;
  A900?: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    customShadows?: {
      button: string,
      text: string,
      z1: string,
      primary: string,
      secondary: string,
      error: string,
      warning: string,
      info: string,
      success: string,
      grey: string,
      primaryButton: string,
      secondaryButton: string,
      errorButton: string,
      warningButton: string,
      infoButton: string,
      successButton: string,
      greyButton: string,
    },
    palette: {
      mode: 'light' | 'dark',
      primary: PaletteColor,
      secondary: PaletteColor,
      info: PaletteColor,
      success: PaletteColor,
      warning: PaletteColor,
      error: PaletteColor,
      info: PaletteColor,
      grey: PaletteColor,
      text: {
        primary: string,
        secondary: string,
        disabled: string
      },
      background: {
        paper: string;
        default: string;
      },
      common: {
        black: string,
        white: string
      },
      divider: string,
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: {
      button: string,
      text: string,
      z1: string,
      primary: string,
      secondary: string,
      error: string,
      warning: string,
      info: string,
      success: string,
      grey: string,
      primaryButton: string,
      secondaryButton: string,
      errorButton: string,
      warningButton: string,
      infoButton: string,
      successButton: string,
      greyButton: string,
    },
    palette: {
      mode: 'light' | 'dark',
      primary: PaletteColor,
      secondary: PaletteColor,
      info: PaletteColor,
      success: PaletteColor,
      warning: PaletteColor,
      error: PaletteColor,
      info: PaletteColor,
      grey: PaletteColor,
      text: {
        primary: string,
        secondary: string,
        disabled: string
      },
      background: {
        paper: string;
        default: string;
      },
      common: {
        black: string,
        white: string
      },
      divider: string,
    }
  }
}