import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Home from './pages/home';
import Registration from './pages/Registration.jsx';
import Error404 from './components/Error404';
import LandingPage from './pages/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Registration />} />
      <Route path="*" element={<Error404 />} />
      <Route path="main" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);

<Home />;
