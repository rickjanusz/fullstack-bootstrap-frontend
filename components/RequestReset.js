import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(inputs);
    const res = await signup().catch(console.error);
    console.log({ data, loading, error });
    resetForm();
    // send email and password to gql
  }
  // const error =
  //   data?.authenticateUserWithPassword.__typename ===
  //   'UserAuthenticationWithPasswordFailure'
  //     ? data?.authenticateUserWithPassword
  //     : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <fieldset>
        <h2>Request Password Reset</h2>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link</p>
        )}
        <DisplayError error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit"> Request Reset</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
