'use client'

// next
import NextLink from 'next/link';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from '@/sections/auth/AuthWrapper';
import AuthRegister from '@/sections/auth/auth-forms/AuthRegister';
import { api } from '@/trpc/react';

// ================================|| REGISTER ||================================ //

export default function Admin() {
  const { data } = api.role.getRoles.useQuery();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h4">Create Admin Account</Typography>
            <NextLink href="/" passHref legacyBehavior>
              <Link variant="body1" color="primary">
                login
              </Link>
            </NextLink>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister roles={data} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
