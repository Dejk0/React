import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import RefForm from './RefForm';
import MainNavigation from './MainNavigation';

function Modal({ onClose }: { onClose: () => void }) {
  // rendered into document.body, outside the normal component tree position
  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'grid', placeItems: 'center',
      }}
    >
      <div style={{ background: 'white', color: 'black', padding: '1rem' }}>
        <p>I am a modal rendered via a portal.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default function PortalsRefsExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <section>
      <h2>07 - Portals &amp; Refs</h2>
      <input ref={inputRef} placeholder="I get focused by the button" />
      <button onClick={() => inputRef.current?.focus()}>Focus input (ref)</button>
      <button onClick={() => setOpen(true)}>Open modal (portal)</button>
      {open && <Modal onClose={() => setOpen(false)} />}
      <RefForm />
      <MainNavigation />
    </section>
  );
}
