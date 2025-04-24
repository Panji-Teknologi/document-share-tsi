'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';

// project import
import getColors from '@/utils/getColors';

interface DotProps {
  color?: string;
  size?: number;
  variant?: string;
  sx?: SxProps;
};

const Dot = ({ color, size, variant, sx }: DotProps) => {
  const theme = useTheme();
  const colors = getColors(theme, color || 'primary');
  const { main } = colors;

  return (
    <Box
      component="span"
      sx={{
        width: size || 8,
        height: size || 8,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? '' : main,
        ...(variant === 'outlined' && {
          border: `1px solid ${main}`
        }),
        ...sx
      }}
    />
  );
};

export default Dot;
