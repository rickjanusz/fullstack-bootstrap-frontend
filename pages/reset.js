import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Sorry, you must supply a token</p>
        <RequestReset />
      </>
    );
  }

  return (
    <div>
      <p>Reset Your Password {query.token}</p>
      <Reset token={query.token} />
      {/* <Reset /> */}
    </div>
  );
}

export default ResetPage;
