import React from 'react';
import '../styles/error404.css';

const Error404 = () => {
  return (
    <div>
      <div id="clouds">
        <div class="cloud x1"></div>
        <div class="cloud x1_5"></div>
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
      </div>
      <div class="c">
        <div class="_404">404</div>
        <hr></hr>
        <div class="_1">LA PAGE</div>
        <div class="_2">EST INTROUVABLE</div>
        <a class="btn" href="/">
          BACK TO MARS
        </a>
      </div>
    </div>
  );
};

export default Error404;
