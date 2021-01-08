import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer } from 'mobx-react';
import NumberStore from 'stores/NumberStore';
import TestStore from 'stores/TestStore';
import { useStore } from 'stores';
import Layout, { siteTitle } from 'components/layout';

const Home: React.FC = () => {
  const { number, upNumber } = useStore('NumberStore') as NumberStore;
  const { test, upTest, testNumer, upTestNumber } = useStore(
    'TestStore'
  ) as TestStore;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        TestStore test getServerSideProps : {test}
        <button type="button" onClick={upTest}>
          up
        </button>
        <br />
        <br />
        TestStore testNumber : {testNumer}
        <button type="button" onClick={upTestNumber}>
          upTestNumber
        </button>
        <br />
        <br />
        NumberStore number : {number}
        <button type="button" onClick={upNumber}>
          upNumber
        </button>
        <br />
        <br />
        <Link href="/test">go test page</Link>
      </div>
    </Layout>
  );
};

export default observer(Home);

export async function getServerSideProps() {
  return {
    props: {},
  };
}
