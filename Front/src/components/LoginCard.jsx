import iconLight from '../assets/logo-icon.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import colors from '../utils/colors';

const StyledCard = styled.main`
  background: #4e5166;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: 500px;
  margin: 60px auto 60px auto;
  padding: 5px;
  max-width: 500px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .card_logo {
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: white;
    border-radius: 100%;
    border: outset;
  }

  /* .card_logo {
    width: 50%;
    height: 20%;
    margin-right: 20px;
    object-fit: cover;
  } */

  .firstLink {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 27%;
    width: 100%;
  }

  h1 {
    color: #fff;
    font-size: 22px;
    align-self: center;
  }

  .card_wrapper_signup {
    background: #fff;
    border-radius: 8px;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
    height: 670px;
    margin: 60px auto 60px auto;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .form_wrapper {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .form_wrapper_signup {
    margin-top: 0px !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .form {
    margin-top: 8px;
  }

  .form_input_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .form_input_wrapper input {
    margin-top: 5px;
    border-radius: 3px;
    height: 22px;
    width: 100%;
    box-sizing: border-box;
  }

  .form_input_wrapper label {
    margin-top: 12px;
    color: white;
  }

  .form_input_wrapper a {
    color: #fff;
    text-decoration: none;
    margin-top: 12px;
    align-self: center;
    font-size: 14px;
  }

  .link,
  a:hover {
    text-decoration: underline;
  }

  input[type='submit'] {
    background: ${colors.primary};
    color: ${colors.tertiary};
    border: none;
    width: 100%;
    height: 50px;
    margin-top: 30px;
    cursor: pointer;
    font-size: 17px;
  }

  input[type='submit']:hover {
    box-shadow: 0px 1px 7px ${colors.primary};
  }

  span {
    margin: 12px auto;
    font-size: 14px;
    color: white;
  }
`;

const LoginCard = () => {
  const [emailVal, setEmail] = useState('');
  const [passwordVal, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { email: emailVal, password: passwordVal };

    axios
      .post('http://localhost:5000/auth/login', userData)
      .then((response) => {
        // document.cookie = `token=${response.data.token};max-age=60*60*24;path=/;samesite=strict; secure `;
        localStorage.setItem('Token', response.data.token);
        document.location.href = 'http://localhost:3000/main';
      })
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <StyledCard className="card_wrapper">
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img className="card_logo" src={iconLight} alt="logo groupomania" />
      </div>

      <div className="form_wrapper">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit} className="form" action="">
          <div className="form_input_wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              name="email"
              required
              minLength="8"
              size="35"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              name="password"
              required
              minLength="8"
              maxLength="73"
              size="35"
            />
            <a href="/#">Mot de passe oublié ?</a>
            <input type="submit" value="Envoyer" />

            <span>
              Vous n'avez pas de compte ?{' '}
              <Link className="link" to="/signup">
                Inscrivez-vous
              </Link>
            </span>
          </div>
        </form>
      </div>
    </StyledCard>
  );
};

export default LoginCard;
