import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconLight from '../assets/iconLight.png';

const NavContainer = styled.nav`
  background-color: #fff;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    width: 15%;
    min-width: 210px;
    height: 100%;
    margin-right: 0px;
    object-fit: cover;
  }

  > div {
    display: flex;
  }

  > div a {
    color: #4e5166;
    text-decoration: none;
    margin-right: 50px;
  }
`;

const Header = () => {
  return (
    <NavContainer>
      <img src={iconLight} alt="" />
      <div>
        <Link to="/#">Mon profil</Link>
        <Link to="/signup">Se déconnecter</Link>
      </div>
    </NavContainer>
  );
};

export default Header;
