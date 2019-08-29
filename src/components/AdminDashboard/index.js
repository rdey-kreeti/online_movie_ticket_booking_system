import React from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';

import Header from '../Header';

const AdminOptionLinks = Styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AdminOptionLinksItem = Styled.li``;

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <AdminOptionLinks>
        <AdminOptionLinksItem><Link to='/theatres'>Theatres</Link></AdminOptionLinksItem>
        <AdminOptionLinksItem><Link to='/movies'>Movies</Link></AdminOptionLinksItem>
      </AdminOptionLinks>
    </>
  )
}

export default AdminDashboard;