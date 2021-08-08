import React, { useState } from 'react';
// import styles from './index.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const Navbar = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position='static' color='default'>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Home' to='/' component={Link} />
        <Tab label='About' to='/about' component={Link} />
      </Tabs>
    </AppBar>
  );
};
