import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconLight from '../assets/logo-icon.svg';
import { AuthContext } from '../utils/context/authContext';

const NavContainer = styled.nav`
  background-color: #4e5166;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 40px;
    height: 40px;
    margin-left: 50px;
    cursor: pointer;
    background-color: white;
    border-radius: 100%;
    border: outset;
  }

  div {
    display: flex;
  }

  div a {
    color: white;
    text-decoration: none;
    margin-right: 50px;
    font-size: 19px;
    cursor: pointer;
  }

  @media screen and (max-width: 550px) {
    flex-direction: column;

    div {
      flex-direction: column-reverse;
      width: 90%;
    }
    div a {
      z-index: -1;
      color: #fff;
      font-size: 19px;
      text-align: center;
      margin: 0;
      padding: 35px 0;
      border-bottom: 1px solid #fff;
      width: 100%;
      cursor: pointer;
    }
  }
`;

const Header = () => {
  const { setAuthState } = useContext(AuthContext); // récupération du context d'auth

  const logout = () => {
    // lors du click sur le bouton de déconnexion on supprime le token du LocalStorage, on supprime les infos utilisateurs et on passe le status "isLogin" sur faux
    localStorage.removeItem('Token');
    setAuthState({
      username: '',
      userId: '',
      isLogin: false,
      userRole: '',
      userPic: '',
    });
  };

  return (
    <NavContainer>
      <img className="logo" src={iconLight} alt="" />
      <div>
        <Link to="/profil">Profil</Link>
        <Link onClick={logout} to="/">
          Déconnexion
        </Link>
      </div>
    </NavContainer>
  );
};

export default Header;
