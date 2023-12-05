import { Box, Button, Text, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { resetPassword } from '../../models_services/firebase_auth_services';
import { useAuthStore } from '../../models_store/auth_store';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  const schema = Yup.object({
    email: Yup.string().required('Required')
  });

  const form = useForm({
    validate: yupResolver(schema),

    initialValues: {
      email: ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;
    try {
      setIsLoading(true);
      await resetPassword(form.values.email);
      setIsLoading(false);
      showNotification({ title: 'Success', message: 'Password reset link sent', autoClose: 6000 });

      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: error.message,
        autoClose: 6000
      });
    }
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isInitialized]);

  return (
    <Box className='xs:w-full sm:w-[500px] py-10 px-6 rounded-md'>
      <Box className='flex flex-col text-center w-full mx-auto '>
        <Text className='mt-4'>Reset your your app name password</Text>
      </Box>

      <Box className='mt-8 flex flex-col items-center'>
        <Box className='w-full'>
          <TextInput placeholder='Email' label='Email' radius={0} {...form.getInputProps('email')} />

          <Button
            onClick={handleSubmit}
            loading={isLoading}
            leftIcon={<Send size={14} />}
            variant='filled'
            className='w-full mt-10 border-0 bg-app-yellow text-black hover:bg-opacity-90 transition'>
            Reset password
          </Button>

          <Box className='mt-4 flex flex-col flex-wrap justify-start items-start w-full'>
            <Button
              onClick={() => router.push('/signin')}
              className='btn-text text-app-yellowText hover:text-opacity-80 transition text-[14px] mt-[2px]'>
              Go to signin
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
