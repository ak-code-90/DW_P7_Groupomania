import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/utils/styles/index.css';
import Home from './pages/home';
import Registration from './pages/Registration.jsx';
import Error404 from './components/Error404';
import { AuthContext } from './utils/context/authContext';
import Dashboard from './pages/Dashboard';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    userId: '',
    isLogin: false,
    userRole: '',
    userPic: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('Token'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, isLogin: false }); // ici on destructure le state pour changer uniquement le status "isLogin"
        } else {
          setAuthState({
            username: response.data.username,
            userId: response.data.userId,
            isLogin: true,
            userRole: response.data.userRole,
            userPic: response.data.userPic,
          });
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  console.log(authState);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<Registration />} />
            <Route path="*" element={<Error404 />} />
            <Route path="main" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

root.render(<App />);
