import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const Login = ({ setLogoutUser, userId, setUserId }) => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[error, setError] = useState('');
  const history = useNavigate();

  console.log('SETuSERiD', setUserId)
  console.log('setlogoutuser', setLogoutUser)
  console.log('userIdfrom log', userId)

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    }).then((response) => {
      console.log('responseLogin', response)
      localStorage.setItem("login", JSON.stringify({
        userLogin: true,
        token: response.data.access_token,
        userId: response.data.userId,
        userName: response.data.email
      }))
      setUserId(response.data.userId);
      setError("");
      setEmail('');
      setPassword('');
      setLogoutUser(false);
      history('/');
      
    // }).catch(error => setError(error.response.data.message))
    }).catch(error => console.log('errorLogin', error))
  }

  const theme = createTheme();

  return (
    <div>

      {error && <p>{error}</p>}

      <ThemeProvider theme={theme}>
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
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email} 
              onChange={e => setEmail(e.target.value)}
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
              value={password} 
              onChange={e => setPassword(e.target.value)}
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
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item xs>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>




      {/* <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={login}
      >
        <TextField 
          id="username" 
          label="Username"
          type="text"
          variant="standard" 
          value={email} 
          onChange={e => setEmail(e.target.value)}/>
        <br />
        <TextField 
          id="password" 
          label="Password"
          type="password"
          variant="standard" 
          value={password} 
          onChange={e => setPassword(e.target.value)}/>
        <br />
        <Button style={{width: "100px"}} color="primary" type='submit'>Login</Button>
      </Box>
      <p>Don't have an account, please do <Link to='/register'>Register</Link> yourself</p> */}
    </div>
  )
}

export default Login