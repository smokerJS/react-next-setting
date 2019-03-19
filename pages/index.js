import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <div>Hello, World!</div>
        <Link href='/post'><a>Post</a></Link>
      </Layout>
    )
  }
}