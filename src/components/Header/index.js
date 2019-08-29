import React from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';

const HeaderWrapper = Styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background: #fff;
  box-shadow: 0 3px 3px rgba(0,0,0,0.3);
  height: 60px;
`;

const Brand = Styled.a`
  font-size: 18px;
  text-transform: uppercase;
`;

const HeaderNav = Styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const HeaderNavItem = Styled.li`
  margin-left: 10px;
  font-size: 16px;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Brand>Movie</Brand>
      <HeaderNav>
        <HeaderNavItem><Link to='/admin-dashboard'>Admin Dashboard</Link></HeaderNavItem>
        <HeaderNavItem><Link>Login</Link></HeaderNavItem>
      </HeaderNav>
    </HeaderWrapper>
  )
}

export default Header;

