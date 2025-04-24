'use client';

import { MouseEventHandler, ReactNode, Ref, forwardRef } from 'react';

// material-ui
import MuiIconButton from '@mui/material/IconButton';
import { SxProps, alpha, styled, useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';

// project imports
import getColors from '@/utils/getColors';
import getShadow from '@/utils/getShadow';

// types
import { ColorType, SizeType, VariantType } from '@/utils/types';

// ==============================|| ICON BUTTON - COLOR STYLE ||============================== //

interface GetColorProps {
  variant: VariantType;
  theme: Theme;
  color: ColorType;
}

function getColorStyle({ variant, theme, color }: GetColorProps) {
  const colors = getColors(theme, color);
  const { lighter, light, dark, main, contrastText } = colors;

  const buttonShadow = `${color}Button`;
  const shadows = getShadow(theme, buttonShadow);

  const commonShadow = {
    '&::after': {
      boxShadow: `0 0 6px 6px ${alpha(`${main}`, 0.9)}`
    },
    '&:active::after': {
      boxShadow: `0 0 0 0 ${alpha(`${main}`, 0.9)}`
    },
    '&:focus-visible': {
      outline: `2px solid ${dark}`,
      outlineOffset: 2
    }
  };

  switch (variant) {
    case 'contained':
      return {
        color: contrastText,
        backgroundColor: main,
        '&:hover': {
          backgroundColor: dark
        },
        ...commonShadow
      };
    case 'light':
      return {
        color: main,
        backgroundColor: lighter,
        '&:hover': {
          backgroundColor: light
        },
        ...commonShadow
      };
    case 'shadow':
      return {
        boxShadow: shadows,
        color: contrastText,
        backgroundColor: main,
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: dark
        },
        ...commonShadow
      };
    case 'outlined':
      return {
        '&:hover': {
          backgroundColor: 'transparent',
          color: dark,
          borderColor: dark
        },
        ...commonShadow
      };
    case 'dashed':
      return {
        backgroundColor: lighter,
        '&:hover': {
          color: dark,
          borderColor: dark
        },
        ...commonShadow
      };
    case 'text':
    default:
      return {
        '&:hover': {
          color: dark,
          backgroundColor: lighter
        },
        ...commonShadow
      };
  }
}

// ==============================|| STYLED - ICON BUTTON ||============================== //

interface IconButtonStyleProps {
  theme: Theme
  variant: VariantType
  shape: string
  children: ReactNode
  color: ColorType
};

const IconButtonStyle = styled(MuiIconButton, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'shape' })(
  ({ theme, variant, shape, color }: IconButtonStyleProps) => ({
    position: 'relative',
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      borderRadius: shape === 'rounded' ? '50%' : 4,
      opacity: 0,
      transition: 'all 0.5s'
    },

    ':active::after': {
      position: 'absolute',
      borderRadius: shape === 'rounded' ? '50%' : 4,
      left: 0,
      top: 0,
      opacity: 1,
      transition: '0s'
    },
    ...(shape === 'rounded' && {
      borderRadius: '50%'
    }),
    ...(variant === 'outlined' && {
      border: '1px solid',
      borderColor: 'inherit'
    }),
    ...(variant === 'dashed' && {
      border: '1px dashed',
      borderColor: 'inherit'
    }),
    ...(variant !== 'text' && {
      '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[200]
      }
    }),
    ...getColorStyle({ variant, theme, color })
  })
);

// ==============================|| EXTENDED - ICON BUTTON ||============================== //

interface IconButtonProps {
  variant?: VariantType;
  shape?: 'square' | 'rounded' | 'circle';
  children: ReactNode;
  color?: ColorType;
  size?: SizeType;
  edge?: 'start' | 'end';
  onClick?: (evnet: any) => void;
  sx?: SxProps;
  onMouseDown?: MouseEventHandler<HTMLButtonElement> | undefined;
  others?: any;
}

const IconButton = forwardRef(({ variant = 'text', shape = 'square', children, color = 'primary', onMouseDown, ...others }: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
  const theme = useTheme();

  return (
    <IconButtonStyle ref={ref} disableRipple variant={variant} shape={shape} theme={theme} color={color} onMouseDown={onMouseDown} {...others}>
      {children}
    </IconButtonStyle>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
