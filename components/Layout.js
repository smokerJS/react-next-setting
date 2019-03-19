import React from 'react';
import Link from 'next/link'
import { Header, Container, Divider, Icon } from 'semantic-ui-react';

const Layout = ({ children }) => {
  return (
    <Container>
      <Link href='/'>
        <a>
          <Header as="h1" className="h1">
            next react setting
          </Header>
        </a>
      </Link>
      {children}
      <Divider />
    </Container>
  );
};

export default Layout;