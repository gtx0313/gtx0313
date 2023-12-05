import { Box, Menu, Text, useMantineColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { signOut } from '../../models_services/firebase_auth_services';

export function MenuMore() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push('/signin');
  }
  return (
    <Box className='flex items-center mr-2 cursor-pointer'>
      <Menu shadow='md' width={150} trigger='hover' openDelay={100} closeDelay={50}>
        <Menu.Target>
          <Text>More</Text>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item className='mt-2' onClick={() => router.push('/privacy')}>
            Privacy
          </Menu.Item>
          <Menu.Item className='mt-2' onClick={() => router.push('/terms')}>
            Terms
          </Menu.Item>
          <Menu.Item className='mt-2' onClick={() => router.push('/contact-us')}>
            Contact
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
