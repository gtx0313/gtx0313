import { Box } from '@mantine/core';
import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', className, meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | your app name`}</title>
      {meta}
    </Head>

    <Box className={className} sx={{}} ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
