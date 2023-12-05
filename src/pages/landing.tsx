import { ReactElement } from 'react';
import { LandingFooter } from '../pages_sections/LandingFooter';

import Page from '../components/others/Page';
import Layout from '../layouts';
import LandingCallToAction from '../pages_sections/LandingCallToAction';
import LandingHero from '../pages_sections/LandingHero';
import LandinWhyChooseUs from '../pages_sections/LandingWhyChooseUs';

export default function LandingPage() {
  return (
    <Page title='Landing'>
      <LandingHero />
      <LandingCallToAction />
      <LandinWhyChooseUs />
      <LandingFooter />
    </Page>
  );
}

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
