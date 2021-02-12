import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  // console.log(query.id);
  return (
    <div>
      <SingleProduct id={query.id} />
    </div>
  );
}
