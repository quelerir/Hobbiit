import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/about/AboutPage';
import UserPage from './components/user/UserPage';
import TreadPage from './components/tread/TreadPage';
import SignupPage from './components/auth/SignupPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/tread/:id" element={<TreadPage />} />
      </Routes>
    </div>
  );
}

export default App;
