import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SignIn() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  const [created, setCreated] = useState(false);

  if (localStorage.getItem('flash') !== 'false' && localStorage.getItem('flash') !== 'null') {
    setCreated(true);
    localStorage.setItem('flash', false);
  }

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailed(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCreated(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let formData = new FormData();
    formData.append("data[users][user_name]", data.get('email'));
    formData.append("data[users][user_password]", data.get('password'));
    axios.post('https://abc.fiyge.com/access_controls/users/login.json', formData)
      .then(response => {
        if (response.data.message.includes('login successfully')) {
          localStorage.setItem('access', response.data.access_token);
          localStorage.setItem('refresh', response.data.refresh_token);
          localStorage.setItem('flash', 'Logged in');
          navigate('/');
        } else {
          setFailed(true);
        }
      });
  };

  return (
    <div>
      <Snackbar open={failed} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
          Login failed
        </Alert>
      </Snackbar>
      <Snackbar open={created} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
          Account created!
        </Alert>
      </Snackbar>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs={8} sm={8}>
                <Link href="/register" variant="body2" justifyContent="flex-start">
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
              <Grid item xs={4} sm={4} justifyContent="flex-end">
                <Link href="/forgot" variant="body2">
                  {"Forgot password?"}
                </Link>
              </Grid>
            </Grid>
            
            <div className="hr-with-text">OR</div>
            <Stack sx={{ pt: 1 }}  direction="row"  spacing={2}  justifyContent="center">
              <Grid container>
                <Grid item>
                  <Link href="https://abc.fiyge.com/access_controls/users/social_login?provider=Facebook">
                    <FacebookLoginButton>
                      <span style={{fontSize: 13}}>Log in with Facebook</span>
                    </FacebookLoginButton>
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link href="https://abc.fiyge.com/access_controls/users/social_login?provider=Google">
                    <GoogleLoginButton>
                      <span style={{fontSize: 13}}>Log in with Google</span>
                    </GoogleLoginButton>
                  </Link>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
