// Importing dependencies
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import logo from './images/logo.png';

// Importing components
import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';
import Create from './Create';
import Forgot from './Forgot';
import Reset from './Reset';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Oswald',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#FFFFF'
    },
  }
});

function Login(props) {
  const handleSubmit = () => {
    localStorage.setItem('access', 'null');
  }
  if (!props.loggedIn) {
    return (<Button href="/login" color="inherit">Login</Button>);
  } else {
    return (<Button onClick={handleSubmit} href="/login" color="inherit">Logout</Button>);
  }
}

// App component
export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('access') === 'null') {
      setLoggedIn(false)
    } else {
      axios({
        method: "get",
        url: "https://abc.fiyge.com/access_controls/users/index.json",
        headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.getItem('access')},
      }).then(res => {
        // Checking if user is logged in and redirecting them if they're not
          if (res.data.message.includes('Login failed') || res.data.errors.includes('Client need to login to access this URL')) {
            localStorage.setItem('access', 'null');
            setLoggedIn(false);
          } else {
            setLoggedIn(true);
          }
        });
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <img src={logo} alt="logo" style={{
                width: "130px"
              }}/>
              <Button href="/" style={{
                marginLeft: "auto"
              }} color="inherit">Home</Button>
              <Login loggedIn={loggedIn}/>
            </Toolbar>
          </AppBar>
        </Box>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}
