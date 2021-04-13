import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0 0 5rem 0;
  padding: 0 5rem 0 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  transition: var(--transition);
  a,
  button {
    transition: color 0.4s;
    padding: 1rem 1vw;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    color: var(--primary-main);
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    &:before {
      content: '';
      height: 0;
      width: 100%;
      position: absolute;
      left: 0;
      z-index: -1;
      background-color: var(--primary-main);
      transform: rotate(-2deg);
      transform-origin: center;
      transition: all 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.5);
      box-shadow: 0 7px 5px -6px rgba(0, 0, 0, 0.5);
      border-radius: 5px 0 5px 0;
    }
    &:hover {
      text-decoration: none;
      outline: none;
      color: white;
      &:before {
        height: 60%;
      }
    }
    &[aria-current],
    .current,
    .active {
      color: white;
      pointer-events: none;
    }
  }
  @media (max-width: 1300px) {
    /* margin: 0; */
    border-top: 1px solid white;
    width: 100%;
    justify-content: center;
    transition: var(--transition);
    padding: 0;
    a,
    button {
      font-size: 2rem;
      &:before {
        width: 100%;
        left: 0;
      }
      &:hover {
        color: white;
        &:before {
          height: 50%;
        }
      }
    }
  }

  @media (max-width: 700px) {
    a,
    button {
      font-size: 1.5rem;
      padding: 0.5rem;

      &:hover {
        color: black;
        &:before {
          height: 0%;
        }
      }
    }
  }
`;

export default NavStyles;
