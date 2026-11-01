// Components are functions returning JSX. JSX allows embedding JS in {}.
function Header() {
  const title = 'My Shop';
  return (
    <header>
      <h3>{title.toUpperCase()}</h3>
    </header>
  );
}

function Footer() {
  return <footer>&copy; {new Date().getFullYear()}</footer>;
}

export default function ComponentsJsxExample() {
  return (
    // a component must return ONE root element (or a fragment <>...</>)
    <section>
      <h2>02 - Components &amp; JSX</h2>
      <Header />
      <p>Main content</p>
      <Footer />
    </section>
  );
}
