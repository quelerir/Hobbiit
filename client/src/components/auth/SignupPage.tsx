// @ts-nocheck
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { UserSignUpType } from '../../types/UserTypes';
import { signUpThunk } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignupPage() {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<UserSignUpType>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value) setError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password || password.length < 8 || regex.test(password)) {
      setError((prev) => ({
        ...prev,
        password:
          'Введите пароль длиннее 8 символов, который содержит прописную, заглавную букву,цифру и специальный символ',
      }));
      return false;
    }
    return true;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.firstname) {
      setError((prev) => ({ ...prev, firstname: 'Введите имя' }));
    }
    if (!input.lastname) {
      setError((prev) => ({ ...prev, lastname: 'Введите фамилию' }));
    }
    if (!input.email) {
      setError((prev) => ({ ...prev, email: 'Введите email' }));
    }
    if (validatePassword(input.password) && input.email && input.firstname && input.lastname) {
      dispatch(signUpThunk(input, navigate));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={changeHandler}
                  value={input.firstname}
                />
              {error.firstname && <span>{error.firstname}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={changeHandler}
                  value={input.lastname}
                  />
                  {error.lastname && <span>{error.lastname}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={changeHandler}
                  value={input.email}
                />
              {error.email && <span>{error.email}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={changeHandler}
                  value={input.password}
                />
              {error.password && <span>{error.password}</span>}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
