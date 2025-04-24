'use client';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';

// project import
import getColors from '@/utils/getColors';

// types
import { ColorType, MediaQueryType, TypeType } from '@/utils/types';
import { ReactNode } from 'react';

// ==============================|| AVATAR - COLOR STYLE ||============================== //

interface GetColorStyle {
  theme: Theme;
  color: ColorType;
  variant: "rounded" | "circular" | "square" | string;
  type: TypeType;
}

function getColorStyle({ theme, color, type }: GetColorStyle) {
  const colors = getColors(theme, color);
  const { lighter, light, main, contrastText } = colors;

  switch (type) {
    case 'filled':
      return {
        color: contrastText,
        backgroundColor: main
      };
    case 'outlined':
      return {
        color: main,
        border: '1px solid',
        borderColor: main,
        backgroundColor: 'transparent'
      };
    case 'combined':
      return {
        color: main,
        border: '1px solid',
        borderColor: light,
        backgroundColor: lighter
      };
    default:
      return {
        color: main,
        backgroundColor: lighter
      };
  }
}

// ==============================|| AVATAR - SIZE STYLE ||============================== //

function getSizeStyle(size: string) {
  switch (size) {
    case 'badge':
      return {
        border: '2px solid',
        fontSize: '0.675rem',
        width: 20,
        height: 20
      };
    case 'xs':
      return {
        fontSize: '0.75rem',
        width: 24,
        height: 24
      };
    case 'sm':
      return {
        fontSize: '0.875rem',
        width: 32,
        height: 32
      };
    case 'lg':
      return {
        fontSize: '1.2rem',
        width: 52,
        height: 52
      };
    case 'xl':
      return {
        fontSize: '1.5rem',
        width: 64,
        height: 64
      };
    case 'md':
    default:
      return {
        fontSize: '1rem',
        width: 40,
        height: 40
      };
  }
}

// ==============================|| STYLED - AVATAR ||============================== //

interface AvatarStyleProps {
  theme: Theme;
  color: ColorType;
  type: TypeType;
  variant: "rounded" | "circular" | "square" | string;
  size: MediaQueryType | 'badge';
}

const AvatarStyle = styled(MuiAvatar, { shouldForwardProp: (prop) => prop !== 'color' && prop !== 'type' && prop !== 'size' })(
  ({ theme, variant, color, type, size }: AvatarStyleProps) => ({
    ...getSizeStyle(size),
    ...getColorStyle({ variant, theme, color, type }),
    ...(size === 'badge' && {
      borderColor: theme.palette.background.default
    })
  })
);

// ==============================|| EXTENDED - AVATAR ||============================== //

interface AvatarProps {
  children?: ReactNode;
  color?: ColorType;
  type?: TypeType | any;
  size?: MediaQueryType | 'badge';
  alt?: string;
  src?: string;
  variant?: "circular" | "rounded" | "square" | string;
  sx?: SxProps;
  others?: string;
}

export default function Avatar({ variant = 'circular', children, color = 'primary', type, size = 'md', ...others }: AvatarProps) {
  const theme = useTheme();

  return (
    <AvatarStyle variant='circular' theme={theme} color={color} type={type} size={size} {...others}>
      {children}
    </AvatarStyle>
  );
}
