import React from 'react';
// import styles from './index.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
  );
};
