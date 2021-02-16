import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

export const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
      id
      label
      total
      charge
      items {
        id
        name
        description
        price
        quantity
        photo {
          id
          image {
            publicUrlTransformed
          }
        }
      }
      user {
        id
        name
        email
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 4rem;
`;

function countItemsInOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function Orders() {
  const { data, loading, error } = useQuery(ALL_ORDERS_QUERY);
  console.log({ data, loading, error });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { allOrders } = data;
  return (
    <>
      <Head>
        <title>Fullstack Bootstrap | Your orders ({allOrders.length})</title>
      </Head>
      <h2> You have {allOrders.length} orders </h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <div>
                <h2>Order ID: {order.id}</h2>
                <div className="order-meta">
                  <p>
                    {countItemsInOrder(order)} Item
                    {countItemsInOrder(order) > 1 ? 's' : ''}
                  </p>
                  <p>
                    {order.items.length} Product
                    {order.items.length > 1 ? 's' : ''}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo.image.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </>
  );
}
