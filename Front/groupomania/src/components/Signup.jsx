import React from 'react';
import { Link } from 'react-router-dom';
import iconLight from '../assets/iconLight.png';
import '../styles/signup.css';

const Signup = () => {
  return (
    <main className="card_wrapper card_wrapper_signup">
      <Link className="firstLink" to="/">
        <img className="card_logo" src={iconLight} alt="logo groupomania" />
      </Link>
      <div className="form_wrapper form_wrapper_signup">
        <h1>Inscrivez-vous</h1>
        <form className="form" action="">
          <div className="form_input_wrapper">
            <label htmlFor="name">Nom</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              minlength="2"
              size="35"
            />
            <label htmlFor="firstName">Prénom</label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              minlength="2"
              size="35"
            />

            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              minlength="6"
              maxlength="20"
              size="35"
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minlength="6"
              maxlength="40"
              size="35"
            />

            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
