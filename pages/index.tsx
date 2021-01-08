import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer } from 'mobx-react';
import Layout, { siteTitle } from '../components/layout';
import TestStore from '../stores/TestStore';

const Home: React.FC = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <Link href="/test">test</Link>
      </div>
    </Layout>
  );
};

export default observer(Home);

export async function getServerSideProps() {
  return {
    props: {
      // test: data
    },
  };
}
