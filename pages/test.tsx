import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { observer } from 'mobx-react';
import axios from 'axios';
import React from 'react';
import { useStore } from 'stores';
import TestStore from 'stores/TestStore';
import NumberStore from 'stores/NumberStore';

import Layout, { siteTitle } from 'components/layout';

const Home: React.FC = props => {
  const { test, upTest, testNumer, upTestNumber } = useStore(
    'TestStore'
  ) as TestStore;
  const { number, upNumber } = useStore('NumberStore') as NumberStore;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
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
          <Link href="/">go index page</Link>
        </div>
      </div>
    </Layout>
  );
};

export default observer(Home);

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(
    'https://api.ping2g.com/sp/showrooms?from=home&home_YN=true&_sort=id:desc&_limit=10&id_lte=92'
  );
  console.log(data);
  return {
    props: {
      initialState: { TestStore: { test: data.response.numFound } },
    },
  };
};
