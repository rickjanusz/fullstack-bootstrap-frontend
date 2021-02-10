import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

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
        <h2>Create An Account</h2>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in.
          </p>
        )}
        <DisplayError error={error} />
        <label htmlFor="name">
          Full Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit"> Sign Up!</button>
      </fieldset>
    </Form>
  );
}

export default SignUp;
