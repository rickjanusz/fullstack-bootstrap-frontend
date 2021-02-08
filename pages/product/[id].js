export default function SingleProductPage({ query }) {
  console.log(query.id);
  return (
    <div>
      <p>Hey {query.id}</p>
    </div>
  );
}
