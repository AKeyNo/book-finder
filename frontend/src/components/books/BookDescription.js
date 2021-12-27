import React from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  box: {
    padding: '15px',
  },
  description: {
    padding: '20px',
  },
});

export const BookDescription = ({ book }) => {
  const classes = useStyles();

  const stripHTMLTags = (description) => {
    return description.replace(/<(.|\n)*?>/g, '');
  };

  return (
    <Grid container item xs={12}>
      <Box display='inline-block' className={classes.box}>
        <Paper>
          <Typography variant='subtitle1' className={classes.description}>
            {book ? <div>{stripHTMLTags(book.description)}</div> : <></>}
          </Typography>
        </Paper>
      </Box>
    </Grid>
  );
};
