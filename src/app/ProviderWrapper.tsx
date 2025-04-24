'use client';

import { ReactNode } from 'react';

// next
import { SessionProvider } from 'next-auth/react';

// trpc
import { TRPCReactProvider } from "@/trpc/react";

import { pdfjs } from 'react-pdf';

// project import
import ThemeCustomization from '@/themes';

import ScrollTop from '@/components/ScrollTop';
import Snackbar from '@/components/@extended/Snackbar';
import Notistack from '@/components/third-party/Notistack';

// import { ConfigProvider } from 'contexts/ConfigContext';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    // <ConfigProvider>
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <ScrollTop>
        <SessionProvider refetchInterval={0}>
          <TRPCReactProvider>
            <Notistack>
              <Snackbar />
              {children}
            </Notistack>
          </TRPCReactProvider>
        </SessionProvider>
      </ScrollTop>
      {/* </RTLLayout> */}
    </ThemeCustomization>
    // </ConfigProvider>
  );
}
