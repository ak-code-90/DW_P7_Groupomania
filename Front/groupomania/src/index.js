import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './styles/index.css';
import Home from './pages/home';
import Registration from './pages/home/Registration';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Registration />} />

    </Routes>
  </BrowserRouter>
);



<Home />