import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import MainSettings from '@/components/settings/main';
import UserSettings from '@/components/settings/users';
import ErrorPage from 'next/error';
import Link from 'next/link';

const MapPage = () => {
  const router = useRouter();
  return (
    <div>
      {router.query.id}
      <Link href="./あいうえお">あいうえお</Link>
      <Link href="./かきくけこ">あいうえお</Link>
    </div>
  );
};
export default MapPage;
