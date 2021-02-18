import PleaseSignIn from '../components/PleaseSignIn';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  // console.log(query);
  return (
    <div>
      <PleaseSignIn>
        <UpdateProduct id={query.id} />
      </PleaseSignIn>
    </div>
  );
}
