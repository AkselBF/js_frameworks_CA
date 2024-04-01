import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

interface LayoutProps {
  cartItemCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartItemCount }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItemCount} />
      <main className="flex-grow m-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;