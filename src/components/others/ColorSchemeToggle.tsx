import { ActionIcon, Box, useMantineColorScheme } from '@mantine/core';
import Iconify from './Iconify';

type Props = {
  classname?: string;
};

const size = 22;

export function ColorSchemeToggle({ classname }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box className={`flex items-center mx-4 ${classname}`}>
      <ActionIcon onClick={() => toggleColorScheme()} className='cursor-pointer'>
        {colorScheme === 'dark' ? (
          <Iconify icon={'heroicons-solid:sun'} width={size} height={size} />
        ) : (
          <Iconify icon={'akar-icons:moon-fill'} width={size} height={size} />
        )}
      </ActionIcon>
    </Box>
  );
}
