import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  options: {
    display: 'inline-flex',
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

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
            />
            <TextField
              autoFocus
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignInClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSignInClose} color='primary'>
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
              id='name'
              label='Email Address'
              type='email'
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
