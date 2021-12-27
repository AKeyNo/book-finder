import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Authentication } from './Authentication';
import { Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: '20px',
  },
  root: {
    flexGrow: 1,
  },
  authenticate: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'flex-end',
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
  const [value, setValue] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  // const [auth, setAuth] = useState(true);
  const auth = false;
  const open = Boolean(anchorEl);
  const pages = ['/', '/about', '/search'];

  // sets tab to the correct page
  useEffect(() => {
    const startingPage = window.location.pathname.toLowerCase();

    for (let index = 0; index < pages.length; index++) {
      if (startingPage === pages[index]) {
        setValue(index);
        return;
      }
    }
    // if it does not find the page, do not set the marker
    setValue(-1);
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
    <AppBar position='static' color='default' className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
        >
          <Grid item xs={1} md={5} />
          <Grid container item xs={10} md={2}>
            <Typography variant='h6' className={classes.title}>
              Book Finder
            </Typography>
          </Grid>
          <Grid item className={classes.authenticate} xs={1} md={5}>
            {!auth ? (
              <Authentication />
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
          </Grid>
        </Grid>
      </Toolbar>
      <Tabs value={value} onChange={handleChangeTabs}>
        <Tab label='Home' to='/' component={Link} />
        <Tab label='About' to='/about' component={Link} />
        <Tab label='Search' to='/search' component={Link} />
      </Tabs>
    </AppBar>
  );
};
