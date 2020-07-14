import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDup, setPasswordDup] = useState('');
  const [email, setEmail] = useState('');

  function postRegister(event) {
    // Disable the default form submit action
    event.preventDefault();
    if (password !== passwordDup) {
      alert("Your passwords don't match.");
    } else {
      axios
        .post('http://localhost:1337/auth/local/register', {
          username: userName,
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status !== 200) console.warn(response);
          localStorage.setItem('Authorization-Token', response.data.jwt);
          window.alert('Registration is successful. You can log in with this account.');
          window.location.href = '/login';
        })
        .catch((error) => {
          console.warn(error);
          alert('An unexpected error has occurred');
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form noValidate>
          <TextField
            autoComplete="username"
            name="UserName"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            style={{ marginTop: 20 }}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ marginTop: 20 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ marginTop: 20 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="passwordDup"
            label="Confirm Password"
            type="password"
            id="passwordDup"
            autoComplete="current-password"
            onChange={(e) => {
              setPasswordDup(e.target.value);
            }}
            style={{ marginTop: 20 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={postRegister}
          >
            Register
          </Button>
          <Grid container justify="flex-end" style={{ marginTop: 20 }}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;