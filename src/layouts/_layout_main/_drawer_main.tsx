import { Box, Button, Drawer, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Iconify from '../../components/others/Iconify';
import { useAuthStore } from '../../models_store/auth_store';
import { useBreakpoint } from '../../utils/use_breakpoint';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DrawerLanding({ isOpen, setIsOpen }: Props) {
  const router = useRouter();
  const bp = useBreakpoint();
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  function handleSigninPush() {
    setIsOpen(false);
    router.push('/signin');
  }

  function handleSignupPush() {
    setIsOpen(false);
    router.push('/signup');
  }

  useEffect(() => {
    if (bp !== 'xs') setIsOpen(false);
  }, [bp]);

  return (
    <Drawer className='py-4 px-4 w-full' title='' position='right' withCloseButton={false} opened={isOpen} onClose={() => setIsOpen(false)}>
      <Box onClick={() => setIsOpen(false)} className='flex justify-end m-0 cursor-pointer'>
        <Iconify className='' icon={'ep:circle-close'} width={30} height={30} />
      </Box>

      <Box className='flex flex-col h-[calc(90vh)] justify-center items-center'>
        <Routes setIsOpen={setIsOpen} />

        {!isAuthenticated && (
          <>
            <Button onClick={handleSigninPush} className=' text-black w-[200px] dark:text-white border-dark-800 dark:border-light-800 my-3'>
              <Text>Sign in</Text>
            </Button>

            <Button onClick={handleSignupPush} className='bg-yellow-300 text-dark w-[200px] hover:bg-yellow-400 transition my-3'>
              <Text>Sign up</Text>
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}

function Routes({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);
  if (!isAuthenticated)
    return (
      <>
        <LinkToPage onClick={() => setIsOpen(false)} route='/privacy' text='Privacy' />
        <LinkToPage onClick={() => setIsOpen(false)} route='/terms' text='Terms' />
        <LinkToPage onClick={() => setIsOpen(false)} route='/contact-us' text='Contact' />
      </>
    );

  return (
    <>
      <LinkToPage onClick={() => setIsOpen(false)} route='/signals' text='Signals' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/annoucements' text='Annoucements' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/take-profit' text='Take Profit' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/stop-loss' text='Stop Loss' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/privacy' text='Privacy' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/terms' text='Terms' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/contact-us' text='Contact' />
    </>
  );
}

interface LinkToPageProps {
  route: string;
  text: string;
  onClick: () => void;
}

function LinkToPage({ route, text, onClick }: LinkToPageProps) {
  return (
    <Link className='' href={route} passHref>
      <Text onClick={onClick} className='font-bold mx-3 hover:opacity-95 my-[13px]' component='a'>
        {text}
      </Text>
    </Link>
  );
}
