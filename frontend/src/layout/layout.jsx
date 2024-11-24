import React from "react";
import { Navbar } from "../layout/navbar/navbar.jsx";
import { Footer } from "../layout/footer/footer.jsx";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
