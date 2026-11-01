import {
  MemoryRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router';

// MemoryRouter keeps the URL inside React so this demo doesn't touch the
// browser address bar. In a real app use <BrowserRouter>.

function Layout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
      </nav>
      <hr />
      <Outlet /> {/* the matched child route renders here */}
    </>
  );
}

function Home() {
  return <p>Welcome home.</p>;
}

function Products() {
  return (
    <ul>
      {['p1', 'p2', 'p3'].map((id) => (
        <li key={id}>
          <NavLink to={`/products/${id}`}>Product {id}</NavLink>
        </li>
      ))}
    </ul>
  );
}

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <p>Details for {productId}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default function RoutingExample() {
  return (
    <section>
      <h2>13 - Routing</h2>
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="*" element={<p>Not found</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </section>
  );
}
