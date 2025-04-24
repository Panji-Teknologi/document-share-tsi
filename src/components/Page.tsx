import { forwardRef, ReactNode } from 'react';

// next
import Head from 'next/head';

// material-ui
import { Box } from '@mui/material';

// ==============================|| Page - SET TITLE & META TAGS ||============================== //

interface PageProps {
  children: ReactNode;
  title?: string | number;
  meta?: string;
}

const Page = forwardRef(({ children, title = '', meta, ...other }: PageProps, ref: any) => (
  <>
    <Head>
      <title>{`${title} | JIT`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.displayName = 'Page'

export default Page;
