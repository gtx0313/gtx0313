import { Box, Menu, Text, useMantineColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { signOut } from '../../models_services/firebase_auth_services';

export function MenuTrading() {
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push('/signin');
  }
  return (
    <Box className='flex items-center mr-2 cursor-pointer'>
      <Menu shadow='md' width={150} trigger='hover' openDelay={100} closeDelay={50}>
        <Menu.Target>
          <Text>Trading</Text>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item className='mt-2' onClick={() => router.push('/take-profit')}>
            Take Profit
          </Menu.Item>
          <Menu.Item className='mt-2' onClick={() => router.push('/stop-loss')}>
            Stop loss
          </Menu.Item>
          <Menu.Item className='mt-2' onClick={() => router.push('/long-short')}>
            Long vs Short
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
