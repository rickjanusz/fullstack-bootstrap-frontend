import { gql, useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };

// export default function User() {
//   return <div />;
// }
