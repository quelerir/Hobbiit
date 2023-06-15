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
import { SOCKET_INIT } from './types/wsTypes';
import { CircularProgress } from '@mui/material';
import ProtectedRoute from './hoc/ProtectedRoute';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (!user.id) {
      dispatch({ type: SOCKET_INIT });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode: any) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  console.log(user.locationStatus);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!user?.locationStatus ? (
          <CircularProgress />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute redirect={`/user/${user.id}`} isAllowed={!user.id}>
                  <AboutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <ProtectedRoute redirect={`/user/${user.id}`} isAllowed={!user.id}>
                  <SignupPage />
                </ProtectedRoute>
              }
            />

            <Route element={<ProtectedRoute redirect="/" isAllowed={!!user.id} />}>
              <Route
                path="/user/:id"
                element={<UserPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
              />
              <Route
                path="/tread/:id"
                element={<TreadPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
              />
            </Route>
          </Routes>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
