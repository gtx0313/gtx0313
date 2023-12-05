import { Box, Container, Text } from '@mantine/core';
import { ReactElement } from 'react';
import ContactUsForm from '../components/forms/ContactUsForm';

import Page from '../components/others/Page';

import Layout from '../layouts';
import { useAuthStore } from '../models_store/auth_store';
import { LandingFooter } from '../pages_sections/LandingFooter';

export default function ContactPage() {
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);
  return (
    <Page title='Privacy'>
      <Container className='pt-10 mb-20 ' size={'xl'}>
        <ContactUsForm />
      </Container>
      {!isAuthenticated && <LandingFooter />}
    </Page>
  );
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
