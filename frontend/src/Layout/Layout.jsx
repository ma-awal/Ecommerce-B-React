import React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
const Layout = () => {
  return (
    <div className="  site-container d-flex   flex-column    ">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
