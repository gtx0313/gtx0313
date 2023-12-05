import { Box, Button, Text, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BrandGoogle, Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { signinWithEmail } from '../../models_services/firebase_auth_services';
import { useAuthStore } from '../../models_store/auth_store';
import { useFirestoreStore } from '../../models_store/firestore_store';

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);
  const { streamAuthUser } = useFirestoreStore((state) => state);

  const schema = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  });

  const form = useForm({
    validate: yupResolver(schema),

    initialValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;
    try {
      setIsLoading(true);
      const user = await signinWithEmail(form.values.email, form.values.password);
      if (user) streamAuthUser();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Invalid email or password',
        autoClose: 6000
      });
    }
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) router.push('/signals');
  }, [isAuthenticated, isInitialized]);

  return (
    <Box className='xs:w-full sm:w-[500px] py-10 px-6 rounded-md'>
      <Box className='flex flex-col text-center w-full mx-auto '>
        <Text className='mt-4 text-2xl font-bold'>your app name account login</Text>
      </Box>

      <Box className='mt-8 flex flex-col items-center'>
        <Box className='w-full'>
          <TextInput placeholder='Email' label='Email' radius={0} {...form.getInputProps('email')} />
          <TextInput type='password' className='mt-4' placeholder='Password' label='Password' {...form.getInputProps('password')} />

          <Button
            onClick={handleSubmit}
            loading={isLoading}
            leftIcon={<Send size={14} />}
            variant='filled'
            className='w-full mt-10 border-0 bg-app-yellow text-black hover:bg-opacity-90 transition'>
            Sign in with email
          </Button>
        </Box>

        {/* <Box className='w-full mt-10'>
          <Box className='flex items-center'>
            <div className='w-full border-t border-gray-700' />
            <Text className='mx-4'>or</Text>
            <div className='w-full border-t border-gray-700' />
          </Box>

          <Button
            onClick={handleSubmit}
            leftIcon={<BrandGoogle size={20} />}
            variant='white'
            className='w-full mt-10  text-white bg-gray-700 border-0 hover:opacity-90 hover:text-md text-sm'>
            Sign in with Google
          </Button>
        </Box> */}

        <Box className='mt-4 flex flex-col flex-wrap justify-start items-start w-full'>
          <Button
            onClick={() => router.push('/reset-password')}
            className='btn-text text-app-yellowText hover:text-opacity-80 text-[14px] mt-[2px] transition'>
            Forgot password?
          </Button>
          <Button
            onClick={() => router.push('/signup')}
            className='btn-text text-app-yellowText hover:text-opacity-80 transition text-[14px] mt-[2px]'>
            Create Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
