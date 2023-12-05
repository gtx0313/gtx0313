import { Box, Button, Container, Input, Pagination, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import Page from '../components/others/Page';
import Layout from '../layouts';
import { Announcement } from '../models/model.announcement';
import { useAuthStore } from '../models_store/auth_store';
import { useFirestoreStore } from '../models_store/firestore_store';
import { fDateTimeSuffix } from '../utils/format_time';
import { useBreakpoint } from '../utils/use_breakpoint';

export default function AnnouncementIndexPage() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [itemsPerPage, setItemPerPage] = useState<number>(8);
  const [activePage, setActivePage] = useState(1);
  const { announcements } = useFirestoreStore((state) => state);
  const [filteredAnnouncement, setFilterAnounements] = useState<Announcement[]>([]);
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  const itemHeaderStyle = `dark:text-dark-900 text-[13px] xs:mb-2 sm:mb-2 xs:mr-3 sm:mr-0`;
  const itemBodyStyle = `font-bold text-sm`;

  useEffect(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilterAnounements(announcements.slice(start, end));
  }, [activePage, itemsPerPage, announcements]);

  useEffect(() => {
    if (announcements && searchText) {
      let _announcements = announcements;

      _announcements = announcements.filter((signal) => {
        return signal.title.toLowerCase().includes(searchText.toLowerCase());
      });

      setFilterAnounements(_announcements);
      setFilterAnounements(_announcements.slice(0, itemsPerPage));
      setActivePage(1);
    }
  }, [searchText]);

  const bp = useBreakpoint();
  useEffect(() => {
    if (bp == 'xs') setItemPerPage(4);
    if (bp != 'xs') setItemPerPage(8);
  }, [bp]);

  if (!isAuthenticated) return null;

  return (
    <Page title='Contact'>
      <Container size='xl' className=''>
        <Box className='flex text-center justify-between items-center mt-10 mb-10'>
          <Text className='text-xl font-semibold leading-10'>Announcements</Text>
        </Box>

        <Input
          onChange={(e: { currentTarget: { value: React.SetStateAction<string | null> } }) => {
            setSearchText(e.currentTarget.value);
          }}
          className='xs:w-full sm:w-1/3'
          placeholder='Search signals...'
        />

        {filteredAnnouncement.map((signal) => {
          return (
            <Box key={signal.id} className='border dark:border-dark-500 p-2 my-3 xs:mx-0 sm:mx-0 rounded-lg '>
              <Box className='flex justify-between flex-wrap'>
                <div className='xs:w-[50.0%]  sm:w-[20%] xs:flex sm:flex sm:flex-col'>
                  <Text className={`${itemHeaderStyle}`}>Date</Text>
                  <Text className={`${itemBodyStyle}`}>{fDateTimeSuffix(signal.timestampCreated)}</Text>
                </div>

                <div className='xs:w-[50.0%]  sm:w-[16%] xs:flex sm:flex sm:flex-col'>
                  <Text className={`${itemHeaderStyle}`}>Title</Text>
                  <Text className={`${itemBodyStyle}`}>{signal.title}</Text>
                </div>

                <div className='xs:w-[50.0%]  sm:w-[16%] xs:flex sm:flex sm:flex-col'>
                  <Text className={`${itemHeaderStyle}`}>Description</Text>
                  <Text className={`${itemBodyStyle}`}>{signal.description}</Text>
                </div>
                <div className='xs:w-[50.0%]  sm:w-[16%] xs:flex sm:flex sm:flex-col'>
                  <Text className={`${itemHeaderStyle}`}>Link</Text>
                  <Text className={`${itemBodyStyle} overflow-hidden`}>{signal.link}</Text>
                </div>
                <div className='xs:w-[50.0%]  sm:w-[8%] xs:flex sm:flex sm:flex-col'>
                  <Text className={`${itemHeaderStyle}`}>Image</Text>
                  <Box>
                    <img className='h-[50px] w-[100px] rounded-lg' src={signal.imageUrl} alt='' />
                  </Box>
                </div>
              </Box>
            </Box>
          );
        })}

        <Pagination
          className='sm:mx-2 mb-8 flex justify-end'
          styles={(theme) => ({
            item: {
              '&[data-active]': {
                backgroundColor: '#FCCF2F',
                color: '#000'
              }
            }
          })}
          page={activePage}
          onChange={setActivePage}
          total={Math.ceil(announcements.length / itemsPerPage)}
        />
      </Container>
    </Page>
  );
}

AnnouncementIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
