import React from 'react';
import { Navbar } from '../layout/navbar/navbar.jsx';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;