import { Container } from '@mantine/core';
import { ReactElement } from 'react';

import Page from '../components/others/Page';
import { longShort } from '../data/static/long_short_data';
import Layout from '../layouts';

export default function PrivacyPage() {
  return (
    <Page title='Privacy'>
      <Container className='pt-10 mb-20' size={'xl'}>
        {longShort?.map((item) => (
          <div key={item.id} className='order-list-enable mb-8 last:mb-0 lg:mb-10'>
            <h3 className='mb-4 text-lg font-medium text-dark dark:text-light lg:mb-5'>{item.title}</h3>
            <div
              className='space-y-5 leading-6 '
              dangerouslySetInnerHTML={{
                __html: item.description
              }}
            />
          </div>
        ))}
      </Container>
    </Page>
  );
}

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
