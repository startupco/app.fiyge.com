// Importing dependencies
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Component for page where you create a session
export default function Create() {
  const navigate = useNavigate();
  let tokenobject = '';
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Create the formdata which will be sent in the axios post call
    let formData = new FormData();
    // Convert datetime input into the correct notation for the backend
    let start = data.get('start');
    let end = data.get('end');
    start = start.split('T');
    start[0] = start[0].split('-');
    start = start[0][1] + '/' + start[0][2] + '/' + start[0][0] + ' ' + start[1] + ':00';
    end = end.split('T');
    end[0] = end[0].split('-');
    end = end[0][1] + '/' + end[0][2] + '/' + end[0][0] + ' ' + end[1] + ':00';
    // Add all the data to the formdata to submit
    formData.append("data[my-model][name]", data.get('subject'));
    formData.append("data[my-model][livestream_start]", start);
    formData.append("data[my-model][livestream_end]", end);
    tokenobject.createSession((err, session) => {
      if (err) throw err;
      const sessionId = session.sessionId;
      // Axios post call to create a new livestream
      axios({
        method: "post",
        url: "https://abc.fiyge.com/my-module/my-controller/add.json",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.getItem('access')},
      }).then(res => {
        if (res.data.message.includes('Login failed') || res.data.errors.includes('Client need to login to access this URL')) {
          navigate('/login');
        }
        navigate('/mysessions');
      });
    });
  }
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
          <Typography component="h1" variant="h5">
            Create Session
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Subject"
              name="subject"
              autoComplete="subject"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="start"
              label="Start Time"
              type="datetime-local"
              id="start"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="end"
              label="End Time"
              type="datetime-local"
              id="end"
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
