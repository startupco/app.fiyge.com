import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Stack from '@mui/material/Stack';

export default function SignUp() {
  const [role, setRole] = useState('6193df69-c6e4-4587-afd6-4377ac69033c');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = new FormData();
    formData.append("data[users][user_name]", data.get('email'));
    formData.append("data[users][first_name]", data.get('firstName'));
    formData.append("data[users][last_name]", data.get('lastName'));
    formData.append("data[users][is_license_agreement_accepted]", 1);
    formData.append("data[users][iam][0][time_zone]", 'America/Toronto');
    formData.append("data[users][iam][0][hour_format]", 24);
    formData.append("data[users][iam][0][theme]", '3_panel_fieldset_view/redmond');
    formData.append("data[users][iam][0][locale]", 'en_US');
    formData.append("data[users][iam][0][user_password]", data.get('password'));
    formData.append("data[users][iam][0][confirm_password]", data.get('password'));
    if (data.get('radio-buttons-group') === 'instructor') {
      formData.append("data[users][roles_users][0][role_id]", '6193df71-48b0-438c-8386-4fecac69033c');
    } else {
      formData.append("data[users][roles_users][0][role_id]", '6193df69-c6e4-4587-afd6-4377ac69033c');
    }
    formData.append("data[users][email_addresses][0][type]", 801);
    formData.append("data[users][email_addresses][0][email]", data.get('email'));
    formData.append("data[users][organization_id]", 2);
    formData.append("data[users][is_active]", 1);
    formData.append("data[users][addresses][0][type]", 795);
    formData.append("data[users][addresses][0][address_line_1]", '711-2880 Nulla St.');
    formData.append("data[users][addresses][0][city]", 'Mankato');
    formData.append("data[users][addresses][0][state_id]", 88);
    formData.append("data[users][addresses][0][zip]", 96522);
    formData.append("data[users][addresses][0][country_id]", 226);
    formData.append("data[users][email_addresses][0][email_opt_out]", 1);
    formData.append("data[users][phone_numbers][0][type]", 805);
    formData.append("data[users][phone_numbers][0][number]", '+9131234123213');

    axios.post('https://abc.fiyge.com/access_controls/users/signup.json', formData)
      .then(response => {
        if (response.data.message[0][0] !== 'u') {
          localStorage.setItem('flash', 'Account created');
          navigate('/login');
        }
      });
  };

  return (
    <div>
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
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
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
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-label="gender"
                  defaultValue="trainee"
                  name="radio-buttons-group"
                  onChange={(event) => {
                      if (event.target.value === 'trainee') {
                        setRole('6193df69-c6e4-4587-afd6-4377ac69033c');
                      } else {
                        setRole('6193df71-48b0-438c-8386-4fecac69033c');
                      }
                    }
                  }
                >
                  <FormControlLabel value="trainee" control={<Radio />} label="Trainee" />
                  <FormControlLabel value="instructor" control={<Radio />} label="Instructor" />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body1">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <div className="hr-with-text">OR</div>
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid container>
                <Grid item>
                  <Link href={"https://abc.fiyge.com/access_controls/users/social_signup?provider=Facebook&role_id=" + role + "&organization_id=2"}>
                    <FacebookLoginButton>
                      <span style={{fontSize: 12}}>Sign up with Facebook</span>
                    </FacebookLoginButton>
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link href={"https://abc.fiyge.com/access_controls/users/social_signup?provider=Google&role_id=" + role + "&organization_id=2"}>
                    <GoogleLoginButton>
                      <span style={{fontSize: 12}}>Sign up with Google</span>
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
