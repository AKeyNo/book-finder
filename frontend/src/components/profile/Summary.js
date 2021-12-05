import { makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({}));

export const Summary = ({ user }) => {
  const classes = useStyles();
  const [summary, setSummary] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/${user}/information`)
      .then((data) => {
        if (data.data) {
          console.log(data.data.summary);
          setSummary(data.data.summary);
        }
      })
      .catch((error) => {
        window.alert(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Paper>
      {summary}
      <img
        src={`http://localhost:3001/api/users/${user}/picture`}
        alt='profile'
      />
    </Paper>
  );
};
