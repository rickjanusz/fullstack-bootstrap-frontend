import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  console.log(query);
  return (
    <>
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </>
  );
}
