import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function Checkout() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Do some more stuffs');
  }
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButton>Checkout now</SickButton>
      </CheckoutFormStyles>
    </Elements>
  );
}

export { Checkout };
