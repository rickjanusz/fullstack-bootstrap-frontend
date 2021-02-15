import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  console.log(onRouteChangeError);
};

const Logo = styled.div`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    width: 8em;
    height: 2.5em;
    background-image: url('/static/rickjanusz.svg');
    background-repeat: no-repeat;
    background-position: center;
    text-indent: -9999em;
    display: inline-block;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid ${(props) => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Fullstack Bootstrap</Link>
        </Logo>
        <Nav />
      </div>
      <div className="'sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}
