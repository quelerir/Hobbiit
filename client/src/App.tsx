import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/about/AboutPage';
import UserPage from './components/user/UserPage';
import TreadPage from './components/tread/TreadPage';
import SignupPage from './components/auth/SignupPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/userSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode ? JSON.parse(storedMode) : false;
  });

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode: any) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/user/:id"
            element={<UserPage user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route
            path="/tread/:id"
            element={<TreadPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
