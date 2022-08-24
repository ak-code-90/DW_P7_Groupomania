import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconLight from '../assets/logo-icon.svg';
import { useState } from 'react';
import colors from '../utils/colors';

const StyledSignup = styled.main`
  background: #4e5166;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: auto;
  margin: 60px auto 60px auto;
  max-width: 500px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 5px;

  .firstLink {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 100%;
  }

  h1 {
    color: #fff;
    font-size: 22px;
    align-self: center;
    margin: 20px 0;
  }

  .card_logo {
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: #fff;
    color: white;
    border-radius: 100%;
    border: outset;
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
    color: #fff;
    gap: 6px;
  }

  .form_input_wrapper input {
    margin-top: 5px;
    border-radius: 4px;
    height: 22px;
    width: 100%;
    box-sizing: border-box;
  }

  .form_input_wrapper label {
    margin-top: 5px;
  }

  .form_input_wrapper a {
    color: white;
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
    margin: 30px 0 50px;
    cursor: pointer;
    font-size: 17px;
  }

  input[type='submit']:hover {
    box-shadow: 0px 1px 7px ${colors.primary};
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

  let psw = document.getElementById('password');
  let regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_+&€/()|{}~:!,?.@#\($%\^&\*])(?=.{8,})/;

  // const handleSubmit = (event) => {
  //   let userData = {};
  //   userData = {
  //     username: usernameVal,
  //     email: emailVal,
  //     password: firstpasswordVal,
  //     role: 'isUser',
  //   };

  //   let data = JSON.stringify(userData);
  //   console.log(userData);

  //   fetch('http://localhost:5000/auth', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: data,
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(() => {
  //       alert('Votre compte a bien été enregistré');
  //       document.location.href = 'http://localhost:3000';
  //     })
  //     .catch((error) => alert(error.response.data.error));
  // };

  const handleSubmit = (event) => {
    let userData = {};
    userData = {
      username: usernameVal,
      email: emailVal,
      password: firstpasswordVal,
      role: 'isUser',
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
      .then((data) => {
        data.error
          ? alert(data.error)
          : alert('Votre compte a bien été enregistré');
        document.location.href = 'http://localhost:3000';
      })
      .catch((error) => alert(error.response.data.error));
  };

  const passwordValidation = (e) => {
    if (firstpasswordVal === secondPasswordVal) {
      if (regexPassword.test(psw.value) === false) {
        psw.setCustomValidity(
          'Les mots de passe doivent contenir un minimum de 8 caractères, dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial'
        );
        psw.reportValidity(); //permet d'afficher le message d'erreur custom
      } else {
        e.preventDefault();
        handleSubmit();
      }
    } else {
      psw.setCustomValidity('Les mots de passe doivent correspondre');
      psw.reportValidity();
    }
  };

  return (
    <StyledSignup className="card_wrapper card_wrapper_signup">
      <Link className="firstLink" to="/">
        <img className="card_logo" src={iconLight} alt="logo groupomania" />
      </Link>
      <div className="form_wrapper form_wrapper_signup">
        <h1>Inscription</h1>
        <form
          method="POST"
          action="http://localhost:5000/register"
          onSubmit={handleSubmit}
          className="form"
          id="form"
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
              maxLength="35"
              size="15"
            />
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
              minLength="8"
              size="35"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={(e) => setPassword1(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
              size="35"
            />
            <label htmlFor="psw2">Confirmer le mot de passe</label>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              id="psw2"
              name="psw2"
              required
              size="35"
            />

            <input onClick={passwordValidation} type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </StyledSignup>
  );
};

export default Signup;
