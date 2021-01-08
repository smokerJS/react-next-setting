import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { observer } from 'mobx-react';
import axios from 'axios';
import React from 'react';
import { useStore } from 'stores';
import TestStore from 'stores/TestStore';

import Layout, { siteTitle } from '../components/layout';

/**
 * React hooks를 사용하는 컴포넌트에서 store를 가져올 때 사용한다.
 * 참조) https://mobx-react.js.org/recipes-migration#hooks-for-the-rescue
 */

const Home: React.FC = props => {
  const { test, upTest } = useStore('TestStore') as TestStore;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <Link href="/test">test</Link>
        {test}
        <button type="button" onClick={upTest}>
          up
        </button>
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
