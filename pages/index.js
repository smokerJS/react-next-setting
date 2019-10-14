import React from 'react';
import Helmet from 'react-helmet';
import scss from '@styles/index.scss';
import Hello from '@/Hello';

const Index = () => (
  <React.Fragment>
    <Helmet title="Main Page" />
    <Hello/>
  </React.Fragment>
)

export default Index;