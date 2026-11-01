import { createContext, useContext, useReducer } from 'react';

type Product = { id: string; title: string; price: number };
type CartItem = Product & { qty: number };
type CartAction =
  | { type: 'add'; item: Product }
  | { type: 'remove'; id: string }
  | { type: 'clear' };
type CartContextValue = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextValue | null>(null);

// throws if used outside <CartProvider>, so callers get a non-null value
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      throw new Error('Unknown action');
  }
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return <CartContext value={{ cart, dispatch }}>{children}</CartContext>;
}

const PRODUCTS: Product[] = [
  { id: 'p1', title: 'Chair', price: 269.99 },
  { id: 'p2', title: 'Video game', price: 99.99 },
];

function ProductList() {
  const { dispatch } = useCart();
  return (
    <ul>
      {PRODUCTS.map((p) => (
        <li key={p.id}>
          {p.title} (${p.price}){' '}
          <button onClick={() => dispatch({ type: 'add', item: p })}>Add</button>
        </li>
      ))}
    </ul>
  );
}

function Cart() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <div>
      <h3>Cart</h3>
      {cart.length === 0 && <p>Empty</p>}
      <ul>
        {cart.map((i) => (
          <li key={i.id}>
            {i.qty}x {i.title}{' '}
            <button onClick={() => dispatch({ type: 'remove', id: i.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear</button>
    </div>
  );
}

export default function ComplexStateExample() {
  return (
    <CartProvider>
      <section>
        <h2>11 - Complex State (useReducer + Context)</h2>
        <ProductList />
        <Cart />
      </section>
    </CartProvider>
  );
}
