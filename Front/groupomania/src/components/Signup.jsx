import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconLight from '../assets/iconLight.png';
import { useState } from 'react';

const StyledSignup = styled.main`
  background: #fff;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: auto;
  margin: 60px auto 60px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .firstLink {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
    width: 100%;
  }

  h1 {
    color: #4e5166;
    font-size: 22px;
    align-self: center;
    margin: 20px 0;
  }

  .card_logo {
    width: 50%;
    height: 40px;
    margin-right: 20px;

    object-fit: cover;
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
  }

  .form_input_wrapper label {
    margin-top: 12px;
  }

  .form_input_wrapper a {
    color: #4e5166;
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
    background: #fd2d01;
    color: white;
    border: none;
    width: 100%;
    height: 50px;
    margin: 30px 0 50px;
    cursor: pointer;
    font-size: 17px;
  }

  input[type='submit']:hover {
    box-shadow: 0px 1px 7px #fd2d01;
  }

  span {
    margin: 12px auto;
    font-size: 14px;
  }
`;

const Signup = () => {
  const [usernameVal, setUsername] = useState('');
  const [emailVal, setEmail] = useState('');
  const [firstpasswordVal, setPassword1] = useState('');
  const [secondPasswordVal, setPassword2] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let userData = {};

    if (firstpasswordVal === secondPasswordVal) {
      userData = {
        username: usernameVal,
        email: emailVal,
        password: firstpasswordVal,
      };
      let data = JSON.stringify(userData);

      fetch('http://localhost:5000/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(function (response) {
          return response.json();
        })
        .then(() => {
          alert('Votre compte a bien été enregistré');
          document.location.href = 'http://localhost:3000';
        })
        .catch((error) => alert(error.response.data.error));
    } else {
      alert('les mots de passe doivent correspondre');
    }
  };

  return (
    <StyledSignup className="card_wrapper card_wrapper_signup">
      <Link className="firstLink" to="/">
        <img className="card_logo" src={iconLight} alt="logo groupomania" />
      </Link>
      <div className="form_wrapper form_wrapper_signup">
        <h1>Inscrivez-vous</h1>
        <form
          method="POST"
          action="http://localhost:5000/register"
          onSubmit={handleSubmit}
          className="form"
        >
          <div className="form_input_wrapper">
            <label htmlFor="name">Nom d'utilisateur</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              name="username"
              id="name"
              minLength="2"
              size="35"
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
              minLength="6"
              maxLength="35"
              size="35"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={(e) => setPassword1(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
              minLength="6"
              maxLength="40"
              size="35"
            />
            <label htmlFor="password">Confirmer le mot de passe</label>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
              minLength="6"
              maxLength="40"
              size="35"
            />

            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </StyledSignup>
  );
};

export default Signup;
