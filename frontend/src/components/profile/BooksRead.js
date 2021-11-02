import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({}));

export const BooksRead = ({ books }) => {
  const classes = useStyles();

  const BookList = () => {
    return books.map((book) => {
      return (
        <Grid item xs={12} key={book.id}>
          <Paper elevation={0} variant='outlined'>
            {book.title}
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={1}>
      <BookList />
    </Grid>
  );
  //   return <div>{books && books[0].book_id}</div>;
};
