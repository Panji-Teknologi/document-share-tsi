// next∂
import NextLink from 'next/link';

// material-ui
import { Button, Grid, Stack, Typography } from '@mui/material';

// project import
import { APP_DEFAULT_PATH } from '@/config';

// ==============================|| PAGE ||============================== //

function Error404() {
  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', pt: 1.5, pb: 1, overflow: 'hidden' }}
    >
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h1">Page Not Found</Typography>
          <Typography color="textSecondary" align="center" sx={{ width: { xs: '73%', sm: '61%' } }}>
            The page you are looking was moved, removed, renamed, or might never exist!
          </Typography>
          <NextLink href={APP_DEFAULT_PATH} passHref legacyBehavior>
            <Button variant="contained">Back To Home</Button>
          </NextLink>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Error404;
