import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer } from 'mobx-react';
import NumberStore from 'stores/NumberStore';
import { useStore } from 'stores';
import Layout, { siteTitle } from '../components/layout';

const Home: React.FC = () => {
  const { number, upNumber } = useStore('NumberStore') as NumberStore;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        {number}
        <button type="button" onClick={upNumber}>
          upNumber
        </button>
        <Link href="/test">go test page</Link>
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
