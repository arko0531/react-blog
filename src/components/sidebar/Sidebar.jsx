import React from 'react';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      Sidebar
      <Outlet />
    </div>
  );
};

export default Sidebar;
