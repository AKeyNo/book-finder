import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
axios.defaults.withCredentials = true;

const loginUrl = 'http://localhost:4001/api/login';

const useStyles = makeStyles((theme) => ({
  options: {
    display: 'inline-flex',
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const username = useRef('');
  const password = useRef('');
  const token = useRef('');

  const handleSignInClickOpen = () => {
    setSignInOpen(true);
  };
  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  const handleSignUpClickOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const results = await axios.post(loginUrl, {
        username: username.current,
        password: password.current,
      });

      token.current = results.data.accessToken;
      setSignInOpen(false);
    } catch (e) {
      window.alert('Incorrect username or password!');
      console.log(e);
    }
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
              label='Email Address'
              type='email'
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
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
            <TextField
              autoFocus
              margin='dense'
              id='confirmPassword'
              label='Confirm Password'
              type='password'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignUpClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSignUpClose} color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  return (
    <div className={classes.options}>
      <SignIn />
      <SignUp />
    </div>
  );
};
