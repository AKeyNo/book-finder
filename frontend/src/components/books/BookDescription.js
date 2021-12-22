import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  description: {
    margin: '20px',
  },
});

export const BookDescription = ({ book }) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12}>
      <Paper>
        <Typography variant='subtitle1' className={classes.description}>
          {book ? (
            <div dangerouslySetInnerHTML={{ __html: book.description }} />
          ) : (
            <></>
          )}
        </Typography>
      </Paper>
    </Grid>
  );
};
