import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProviderWrapper from "./ProviderWrapper";
import { startCronJob } from "@/lib/cron";
// import './index.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TSI | Audit Document Share",
  description: "Ultimae App for Document Sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (typeof window === 'undefined') {
  //   startCronJob();
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
