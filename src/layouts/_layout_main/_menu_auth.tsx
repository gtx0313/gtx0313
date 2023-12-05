import { ActionIcon, Box, Divider, Menu, useMantineColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { ArrowsLeftRight, Settings, User } from 'tabler-icons-react';
import { signOut } from '../../models_services/firebase_auth_services';
import { useFirestoreStore } from '../../models_store/firestore_store';

export function MenuAuth() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { streamAuthUser, closeSubscriptions } = useFirestoreStore((state) => state);
  const router = useRouter();

  function handleSignOut() {
    closeSubscriptions();
    signOut();
    router.push('/landing');
  }
  return (
    <Box className='flex items-center mr-2'>
      <Menu shadow='md' width={200} trigger='hover' openDelay={100} closeDelay={100}>
        <Menu.Target>
          <ActionIcon>
            <User />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item className='mt-2' icon={<User size={14} />} onClick={() => router.push('/your-account')}>
            Your account
          </Menu.Item>
          <Menu.Item className='mt-2' icon={<ArrowsLeftRight size={14} />} onClick={() => toggleColorScheme()}>
            Switch Theme
          </Menu.Item>
          <Menu.Item className='mt-2 mb-2' color='red' icon={<Settings size={14} />} onClick={handleSignOut}>
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
