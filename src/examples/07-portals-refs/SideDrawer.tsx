import { createPortal } from 'react-dom';

import classes from './SideDrawer.module.css';

export default function SideDrawer({ onClose }: { onClose: () => void }) {
  const drawerRoot = document.getElementById('drawer');
  if (!drawerRoot) return null;

  return createPortal(
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <aside className={classes.drawer}>
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/products">All Products</a></li>
            <li><a href="/profile">Your Profile</a></li>
          </ul>
        </nav>
      </aside>
    </>,
    drawerRoot
  );
}
