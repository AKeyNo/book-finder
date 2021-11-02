import { makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({}));

export const Summary = ({ user }) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return <Paper>{user.name}</Paper>;
};
