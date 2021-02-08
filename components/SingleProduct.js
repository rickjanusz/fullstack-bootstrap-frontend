import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "601c7d2c0b30f6149e32ca19" }) {
      name
      price
      description
    }
  }
`;
export default function SingleProduct() {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);
  console.log({ data, loading, error });
  return (
    <div>
      <p>Hey Im a single product </p>
    </div>
  );
}
