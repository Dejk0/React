import { useState } from 'react';

import SideDrawer from './SideDrawer';

export default function MainNavigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function handleOpenDrawer() {
    setDrawerIsOpen(true);
  }

  function handleCloseDrawer() {
    setDrawerIsOpen(false);
  }

  return (
    <>
      <header>
        <h3>Demo App</h3>
        <button onClick={handleOpenDrawer}>☰ Menu</button>
      </header>
      {drawerIsOpen && <SideDrawer onClose={handleCloseDrawer} />}
    </>
  );
}
