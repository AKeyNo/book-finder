import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useToken, useTokenUpdate } from './TokenContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.withCredentials = true;

const signInURL = 'http://localhost:4001/api/signin';
const signUpURL = 'http://localhost:4001/api/signup';
const signOutURL = 'http://localhost:4001/api/signout';
const tokenURL = 'http://localhost:4001/api/token';

const useStyles = makeStyles((theme) => ({
  options: {
    display: 'inline-flex',
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const accessToken = useToken();
  const updateAccessToken = useTokenUpdate();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const username = useRef('');
  const password = useRef('');
  const confirmPassword = useRef('');

  // get an access token if possible
  useEffect(() => {
    (async () => {
      try {
        const results = await axios.post(tokenURL);
        updateAccessToken(results.data.accessToken);
        setIsSignedIn(true);
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const handleSignInClickOpen = () => {
    setSignInOpen(true);
  };
  const handleSignInClose = () => {
    setSignInOpen(false);
    username.current = '';
    password.current = '';
    confirmPassword.current = '';
  };

  const handleSignUpClickOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
    username.current = '';
    password.current = '';
    confirmPassword.current = '';
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const results = await axios.post(signInURL, {
        username: username.current,
        password: password.current,
      });

      updateAccessToken(results.data.accessToken);
      setSignInOpen(false);
      setIsSignedIn(true);
    } catch (e) {
      window.alert('Incorrect username or password!');
      console.error(e);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    if (password.current !== confirmPassword.current) {
      window.alert('Passwords are not the same!');
      return;
    }

    try {
      const results = await axios.post(signUpURL, {
        username: username.current,
        password: password.current,
      });

      updateAccessToken(results.data.accessToken);
      setSignUpOpen(false);
      setIsSignedIn(true);
    } catch (e) {
      window.alert('Unable to create an account, try again later.');
      console.error(e);
    }
  };

  const handleSignOutClick = async (event) => {
    event.preventDefault();
    const signOutRequest = await axios.post(signOutURL, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    updateAccessToken(null);
    setIsSignedIn(false);
    console.log(signOutRequest);
  };

  const SignIn = () => {
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleSignInClickOpen}
        >
          Sign In
        </Button>
        <Dialog
          open={signInOpen}
          onClose={handleSignInClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Sign In</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Username'
              type='text'
              fullWidth
              required
              onChange={(e) => (username.current = e.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              required
              onChange={(e) => (password.current = e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignInClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSignInSubmit} color='primary'>
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const SignUp = () => {
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleSignUpClickOpen}
        >
          Sign Up
        </Button>
        <Dialog
          open={signUpOpen}
          onClose={handleSignUpClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create an account to keep track of your readings online!
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='username'
              label='Username'
              type='text'
              fullWidth
              autoComplete='off'
              onChange={(e) => (username.current = e.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              autoComplete='off'
              onChange={(e) => (password.current = e.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              id='confirmPassword'
              label='Confirm Password'
              type='password'
              fullWidth
              autoComplete='off'
              onChange={(e) => (confirmPassword.current = e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignUpClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSignUpSubmit} color='primary'>
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <>
      {!isSignedIn ? (
        <div className={classes.options}>
          <SignIn />
          <SignUp />
        </div>
      ) : (
        <>
          <Button>{accessToken && jwt_decode(accessToken).username}</Button>
          <Button onClick={handleSignOutClick}>Sign Out</Button>
        </>
      )}
    </>
  );
};
