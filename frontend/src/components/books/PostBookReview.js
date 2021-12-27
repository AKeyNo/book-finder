import React, { useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  loading: {
    textAlign: 'center',
  },
});

export const PostBookReview = () => {
  const classes = useStyles();
  const bookReview = useRef('');

  const handleSubmitBookReview = (event) => {
    event.preventDefault();
  };

  return (
    <form
      className={classes.bookSearch}
      onSubmit={handleSubmitBookReview}
      noValidate
      autoComplete='off'
    >
      <Box display='inline-block' className={classes.box}>
        <TextareaAutosize
          maxRows={5}
          aria-label='maximum height'
          placeholder='Write a book review for this book!'
          defaultValue=''
          style={{ width: '100%' }}
          onChange={(e) => (bookReview.current = e.target.value)}
        />
        <Button type='submit'>Search</Button>
      </Box>
    </form>
  );
};
