import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export const BookDescription = ({ book }) => {
  return (
    <Grid container item xs={12}>
      <Typography variant='subtitle1'>
        {book ? (
          <div dangerouslySetInnerHTML={{ __html: book.description }} />
        ) : (
          <></>
        )}
      </Typography>
    </Grid>
  );
};
