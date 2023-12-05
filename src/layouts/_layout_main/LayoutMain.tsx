import { AppShell, Box, Burger, Button, Container, Group, Header, Image, Text, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../models_store/auth_store';
import { useBreakpoint } from '../../utils/use_breakpoint';
import DrawerLanding from './_drawer_main';
import { MenuAuth } from './_menu_auth';
import { MenuMore } from './_menu_more';
import { MenuTrading } from './_menu_trading';

type Props = {
  children: React.ReactNode;
};

export default function LayoutLanding({ children }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(70);
  const router = useRouter();
  const bp = useBreakpoint();
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  useEffect(() => {
    if (bp == 'xs') {
      setAppBarHeight(50);
    } else {
      setAppBarHeight(60);
    }
  }, [bp]);

  return (
    <>
      <DrawerLanding isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
      <AppShell
        className='bg-light-100 dark:bg-dark-100'
        padding={0}
        fixed
        header={
          <Header height={appBarHeight} className='dark:bg-dark-100'>
            <Container size='xl' className='flex justify-between align-middle h-full'>
              <Link href={isAuthenticated ? '/signals' : '/landing'}>
                <Group className='cursor-pointer' spacing={0} align='center'>
                  <Image src={colorScheme == 'dark' ? 'svg/logo-white.svg' : 'svg/logo-black.svg'} width={100} className='' />
                </Group>
              </Link>

              {!isAuthenticated && (
                <Box className='xs:hidden sm:flex'>
                  <Group>
                    <LinkToPage route='/privacy' text='Privacy' />
                    <LinkToPage route='/terms' text='Terms' />
                    <LinkToPage route='/contact-us' text='Contact' />
                  </Group>
                </Box>
              )}

              {isAuthenticated && (
                <Group className='xs:hidden sm:flex'>
                  <LinkToPage route='/signals' text='Signals' />
                  <LinkToPage route='/announcement' text='Annoucements' />
                  <MenuTrading />
                  <MenuMore />
                </Group>
              )}

              {isAuthenticated && (
                <Box className='xs:hidden sm:flex'>
                  <MenuAuth />
                </Box>
              )}

              {!isAuthenticated && (
                <Group className='xs:hidden sm:flex'>
                  <Button onClick={() => router.push('/signin')} className='text-black dark:text-white border-dark-800 dark:border-light-800'>
                    <Text>Sign in</Text>
                  </Button>
                  <Button onClick={() => router.push('/signup')} className='bg-yellow-300 text-dark hover:bg-yellow-400 transition'>
                    <Text>Sign up</Text>
                  </Button>
                </Group>
              )}

              <Box className='xs:flex sm:hidden'>
                {isAuthenticated && <MenuAuth />}
                <Group>
                  <Burger opened={isOpenDrawer} onClick={() => setIsOpenDrawer((o) => !o)} size='sm' />
                </Group>
              </Box>
            </Container>
          </Header>
        }>
        {children}
      </AppShell>
    </>
  );
}

function LinkToPage({ route = '', text = '' }) {
  return (
    <Link href={route} passHref>
      <Text className='mx-2 hover:opacity-95' component='a'>
        {text}
      </Text>
    </Link>
  );
}
