import { Box, Button, Grid, Image, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { sentContactEmail } from '../../models_services/api_contact';

export default function ContactForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const schema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    sujbet: Yup.string(),
    message: Yup.string().required('Required')
  });

  const form = useForm({
    validate: yupResolver(schema),

    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const handleSubmit = async () => {
    if (form.validate().hasErrors) return;

    try {
      setIsLoading(true);
      const res = await sentContactEmail({
        name: form.values.name,
        email: form.values.email,
        message: form.values.message
      });
      setIsLoading(false);
      showNotification({ color: 'blue', title: 'Success', message: 'Your message has been sent successfully', autoClose: 6000 });
      form.reset();
    } catch (error) {
      setIsLoading(false);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'There was an error sending your message. Please try again later',
        autoClose: 6000
      });
    }
  };

  return (
    <Box>
      <Grid className='xs:mt-10 sm:mt-16' align={'center'}>
        <Grid.Col md={6} xs={12}>
          <Text className='xs:text-center md:text-left text-3xl font-semibold leading-10'>
            Contact us <br />
            <span className='text-[20px]'>Have question reach out below</span>
          </Text>
        </Grid.Col>

        <Grid.Col md={6} xs={12}>
          <Box>
            <TextInput className='mt-4' placeholder='Name' label='Name' {...form.getInputProps('name')} />
            <TextInput className='mt-4' placeholder='Email' label='Email' {...form.getInputProps('email')} />
            <Textarea minRows={4} className='mt-4' placeholder='Message' label='Message' {...form.getInputProps('message')} />

            <Button
              onClick={handleSubmit}
              leftIcon={<Send size={14} />}
              variant='filled'
              disabled={isLoading}
              className='w-full mt-10  bg-app-yellow text-black border-0 hover:opacity-90 hover:text-md'>
              Submit
            </Button>
          </Box>
        </Grid.Col>
      </Grid>

      <Image className='mt-20' src='images/world-map.png' />
    </Box>
  );
}
