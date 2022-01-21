// Importing dependencies
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Component for the home page
export default function Home() {
  console.log(localStorage.getItem('access'));
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('refresh_token');
  if (token) {
    localStorage.setItem('refresh', token);
  }
  const [role, setRole] = useState('');
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // Axios call to check if user is logged in / determine their role
  useEffect(() => {
    if (localStorage.getItem('flash') !== 'false' && localStorage.getItem('flash') !== 'null') {
      setOpen(true);
      localStorage.setItem('flash', false);
    }
    if (checked === false) {
      if (token) {
        let formData = new FormData();
        formData.append("refresh_token", localStorage.getItem('refresh'));
        axios({
          method: "post",
          url: "https://abc.fiyge.com/access_controls/users/access_token.json",
          data: formData
        }).then(resp => {
          if (!resp.data['refresh_token']) {
            navigate('/login');
          }
          localStorage.setItem('refresh', resp.data['refresh_token']);
          localStorage.setItem('access', resp.data['access_token']);
          navigate('/');
        });
      } else {
        if (localStorage.getItem('access') === 'null') {
          navigate('/login');
        } else {
          axios({
            method: "get",
            url: "https://abc.fiyge.com/access_controls/roles/view.json?id=6193df71-48b0-438c-8386-4fecac69033c",
            headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.getItem('access')},
          }).then(res => {
            // Checking if user is logged in and redirecting them if they're not
              if (res.data.message.includes('Login failed') || res.data.errors.includes('Client need to login to access this URL')) {
                navigate('/login');
              } else {
                let instructors = res.data.data.roles["roles_users"];
                let found = false;
                for (let i = 0; i < instructors.length; i++) {
                  if (instructors[i]["user_id"] === res.data["user_id"]) {
                    setRole('instructor');
                    found = true;
                  }
                  if (found === false) {
                    setRole('trainee');
                  }
                }
                setChecked(true);
              }
            });
          }
        }
      }
  });
  if (role === 'instructor') {
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Logged in!
          </Alert>
        </Snackbar>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                sx = {{ fontSize: 80}}
              >
                XRayFit
              </Typography>
              <Typography sx = {{ fontSize: 30}} variant="h5" align="center" color="text.secondary" paragraph>
                Earn revenue from teaching people online, in your own sessions, with the assistance of our AI technology.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button style={{minWidth: "180px", minHeight: "100px"}} href="/create" variant="contained">Create a Session</Button>
                <Button style={{minWidth: "180px", minHeight: "100px"}} href="/mysessions" variant="outlined">View my Sessions</Button>
              </Stack>
            </Container>
          </Box>
        </main>
      </div>
    );
  } else if (role === 'trainee') {
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Logged in!
          </Alert>
        </Snackbar>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                sx = {{ fontSize: 80}}
              >
                XRayFit
              </Typography>
              <Typography sx = {{ fontSize: 30}} variant="h5" align="center" color="text.secondary" paragraph>
                Find instructors and join their sessions to teach you to exercise with minimal risk.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button style={{minWidth: "180px", minHeight: "100px"}} href="/instructors" variant="contained">Find instructors</Button>
                <Button style={{minWidth: "180px", minHeight: "100px"}} href="/subscriptions" variant="outlined">View my Subscriptions</Button>
              </Stack>
            </Container>
          </Box>
        </main>
      </div>
    );
  } else {
    return (<div></div>);
  }
}
