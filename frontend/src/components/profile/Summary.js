import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  profilePicture: {
    height: '200px',
    width: '200px',
  },
  information: {
    textAlign: 'center',
  },
}));

export const Summary = ({ user }) => {
  const classes = useStyles();
  const [profileInformation, setProfileInformation] = useState({});

  useEffect(() => {
    const fetchProfileInformation = async () => {
      const result = await axios.get(
        `http://localhost:3001/api/users/${user}/information`
      );
      setProfileInformation(result.data);
      console.log(profileInformation.username);
    };

    fetchProfileInformation();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography className={classes.information}>
        <img
          src={`http://localhost:3001/api/users/${user}/picture`}
          alt='profile'
          className={classes.profilePicture}
        />
        <br />
        {profileInformation ? profileInformation.username : null}
        <br />
        {profileInformation.summary}
      </Typography>
    </>
  );
};
