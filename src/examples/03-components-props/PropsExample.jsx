// props: inputs from parent to child; `children` is the nested content
function Card({ title, price = 0, children }) {
  return (
    <div style={{ border: '1px solid #888', padding: '0.5rem', margin: '0.5rem 0' }}>
      <h3>{title}</h3>
      <p>${price.toFixed(2)}</p>
      {children}
    </div>
  );
}

export default function PropsExample() {
  return (
    <section>
      <h2>03 - Props</h2>
      <Card title="Chair" price={269.99}>
        <em>Ergonomic and stylish.</em>
      </Card>
      <Card title="Game collection" price={99.99} />
      <Card title="Free item" />
    </section>
  );
}
