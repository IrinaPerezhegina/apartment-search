import { ReactNode } from 'react';

const Layout = ({ children }:{ children:ReactNode }) => (
  <div className=" border-b  w-full h-[272px] gap-1 flex pt-[50px] pb-11">
    {children}
  </div>
);

export default Layout;
