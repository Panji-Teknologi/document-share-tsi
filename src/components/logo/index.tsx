'use client'

import NextLink from 'next/link';

// material-ui
import { ButtonBase, SxProps } from '@mui/material';

// project import
import LogoMain from './LogoMain';
import { APP_DEFAULT_PATH } from '@/config';

// ==============================|| MAIN LOGO ||============================== //

interface LogoSectionProps {
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ sx, to }: LogoSectionProps) => (
  <NextLink href={!to ? APP_DEFAULT_PATH : to} passHref legacyBehavior>
    <ButtonBase disableRipple sx={sx}>
      <LogoMain />
    </ButtonBase>
  </NextLink>
);

export default LogoSection;
