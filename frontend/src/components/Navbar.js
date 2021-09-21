import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SignIn } from './SignIn';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

export const Navbar = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  // const [auth, setAuth] = useState(true);
  const auth = false;
  const open = Boolean(anchorEl);
  const pages = ['about', 'search'];

  // sets tab to the correct page
  useEffect(() => {
    const startingPage = window.location.href.toLowerCase();
    for (let index = 0; index < pages.length; index++) {
      if (startingPage.includes(pages[index])) {
        setValue(index + 1);
        return;
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position='static' color='default'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Book Finder
        </Typography>
        {!auth ? (
          <SignIn />
        ) : (
          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
      <Tabs value={value} onChange={handleChangeTabs}>
        <Tab label='Home' to='/' component={Link} />
        <Tab label='About' to='/about' component={Link} />
        <Tab label='Search' to='/search' component={Link} />
      </Tabs>
    </AppBar>
  );
};
